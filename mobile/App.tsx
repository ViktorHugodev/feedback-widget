import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts, Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter';
import { View } from 'react-native';
import { theme } from './src/theme';
import  Widget  from './src/components/Widget';


export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();
  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }}>
      <StatusBar style="light" 
      backgroundColor="transparent"
      translucent
      />
      <Widget/>
   
    </View>
  );
}

