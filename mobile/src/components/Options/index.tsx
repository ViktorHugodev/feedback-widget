import React from 'react';
import { View, Text } from 'react-native';
import { Copyright } from '../Copyright';
import {Option} from '../Option/index'
import { styles } from './styles';
import {feedbackTypes} from '../../utils/feedbackTypes'
import { FeedbackTypeProps } from '../Widget';

interface Props{
  setFeedbackType: (feedbackType: FeedbackTypeProps) => void;
}
export function Options({setFeedbackType}:Props ) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>
      <View style={styles.options}>
      {
        Object
        .entries(feedbackTypes)
        .map(([key, value]) => (
          <Option
          onPress={() => setFeedbackType(key as FeedbackTypeProps)}
          key={key}
          title={value.title}
          image={value.image}
           />
        ))
      }
      </View>
      <Copyright/>
     
    </View>
  );
}