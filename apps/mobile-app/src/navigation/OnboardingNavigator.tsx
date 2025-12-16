import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import BodyScanScreen from '../screens/onboarding/BodyScanScreen';
import StylePrefScreen from '../screens/onboarding/StylePrefScreen';

export type OnboardingStackParamList = {
  Welcome: undefined;
  BodyScan: undefined;
  StylePref: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="BodyScan" component={BodyScanScreen} />
      <Stack.Screen name="StylePref" component={StylePrefScreen} />
    </Stack.Navigator>
  );
}
