import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
//styles
import { theme } from "../../theme";
import { styles } from "./styles";
import { Options } from "../Options";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Form } from "../Form";
import { Success } from "../Success";

export type FeedbackTypeProps = keyof typeof feedbackTypes

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackTypeProps | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleExpand(){
    bottomSheetRef.current?.expand();
  }

  function handleResetFeedback(){
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  function handleFeedbackSent(){
    setFeedbackSent(true)
  }
  return (
    <>
      <TouchableOpacity 
      style={styles.button}
      onPress={handleExpand}
      >
        <ChatTeardropDots
          weight="bold"
          size={24}
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      <BottomSheet 
      snapPoints={[1, 280]} 
      ref={bottomSheetRef}
      backgroundStyle={styles.modal}
      handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? <Success onSendAnotherFeedback={handleResetFeedback} /> : 
        <>
          {
            feedbackType ? <Form 
            onFeedbackCanceled={handleResetFeedback}
            onFeedbackSent={handleFeedbackSent}
            feedbackType={feedbackType}/> : <Options setFeedbackType={setFeedbackType} />
          }
        </>
      }


      </BottomSheet>

  
    </>
  );
}
export default gestureHandlerRootHOC(Widget)