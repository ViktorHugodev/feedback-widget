import React, {useState} from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import {captureScreen} from 'react-native-view-shot'
//styles
import { ArrowLeft } from "phosphor-react-native";
import { styles } from "./styles";
//components 
import { FeedbackTypeProps } from "../Widget/index";
import { ScreenShotBottom } from "../ScreenShotBottom";
import { Button } from "../Button";
import { api } from "../../libs/api";
import * as FileSystem from 'expo-file-system'
interface Props {
  feedbackType: FeedbackTypeProps;
  onFeedbackCanceled: ()=> void
  onFeedbackSent: () => void
}

export function Form({ feedbackType,onFeedbackCanceled, onFeedbackSent }: Props) {
  const [screenShot, setScreenShot] = useState<string | null>(null)
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [comment, setComment] = useState('')
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenShot(){
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
    .then(uri => setScreenShot(uri))
    .catch(err => console.log(err))
  }

  function handleRemoveScreenShot(){
    setScreenShot(null);
  }

  async function handleSendFeedback(){
    if(isSendingFeedback) return
    setIsSendingFeedback(true)

    const screenshotBase64 = screenShot && await FileSystem.readAsStringAsync(screenShot,{
      encoding: 'base64'
    })

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment
      })
      onFeedbackSent()
    } catch (error) {
      console.log(error)
      setIsSendingFeedback(false)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
        <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}> {feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <TextInput
      multiline
      value={comment}
      onChangeText={setComment}
      style={styles.input}
      placeholder="Algo não está funcionando bem? Queremos corrigir. 
      Conte com detalhes o que está acontecendo..."
      placeholderTextColor={theme.colors.text_secondary}
      autoCorrect={false}
      />
      <View style={styles.footer}>
        <ScreenShotBottom 

        onRemoveShot={handleRemoveScreenShot}
        onTakeShot={handleScreenShot}
        screenshot={screenShot}
        />
        <Button
        onPress={handleSendFeedback}
        isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}
