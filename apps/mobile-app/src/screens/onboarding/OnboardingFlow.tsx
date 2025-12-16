import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import VogueCoverScreen from './VogueCoverScreen';
import AtelierEntryScreen from './AtelierEntryScreen';
import NameInputScreen from './NameInputScreen';
import GenderSelectionScreen from './GenderSelectionScreen';
// import HeightSelectionScreen from './HeightSelectionScreen';
// import AgeSelectionScreen from './AgeSelectionScreen';
import BodyAnalysisMethodScreen from './BodyAnalysisMethodScreen';
import StylePreferencesScreen from './StylePreferencesScreen';
import ChefsKitchenScreen from './ChefsKitchenScreen';

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface UserData {
  name?: string;
  gender?: string;
  heightCm?: number;
  age?: number;
  bodyAnalysisMethod?: 'ai' | 'manual';
  styles?: string[];
}

// const TOTAL_STEPS = 9;
const TOTAL_STEPS = 7;

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({});
  const progressAnim = useRef(new Animated.Value(0)).current;
  const screenFadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentStep / TOTAL_STEPS,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const transitionToNext = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(screenFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(screenFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    
    setTimeout(callback, 300);
  };

  const handleNext = () => {
    transitionToNext(() => setCurrentStep(currentStep + 1));
  };

  const handleNameInput = (name: string) => {
    setUserData({ ...userData, name });
    handleNext();
  };

  const handleGenderSelect = (gender: string) => {
    setUserData({ ...userData, gender });
    handleNext();
  };

  const handleHeightSelect = (heightCm: number) => {
    setUserData({ ...userData, heightCm });
    handleNext();
  };

  const handleAgeSelect = (age: number) => {
    setUserData({ ...userData, age });
    handleNext();
  };

  const handleBodyAnalysisAI = () => {
    setUserData({ ...userData, bodyAnalysisMethod: 'ai' });
    handleNext();
  };

  const handleBodyAnalysisManual = () => {
    setUserData({ ...userData, bodyAnalysisMethod: 'manual' });
    handleNext();
  };

  const handleStyleSelect = (styles: string[]) => {
    setUserData({ ...userData, styles });
    handleNext();
  };

  const renderScreen = () => {
    switch (currentStep) {
      case 0:
        return <VogueCoverScreen onNext={handleNext} />;
      case 1:
        return <AtelierEntryScreen onContinue={handleNext} />;
      case 2:
        return <NameInputScreen onNext={handleNameInput} />;
      case 3:
        return <GenderSelectionScreen onSelect={handleGenderSelect} />;
      // case 4:
      //   return <HeightSelectionScreen onNext={handleHeightSelect} />;
      // case 5:
      //   return <AgeSelectionScreen onNext={handleAgeSelect} />;
      case 4:
        return (
          <BodyAnalysisMethodScreen
            onSelectAI={handleBodyAnalysisAI}
            onSelectManual={handleBodyAnalysisManual}
          />
        );
      case 5:
        return <StylePreferencesScreen onNext={handleStyleSelect} />;
      case 6:
        return <ChefsKitchenScreen onComplete={onComplete} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      {currentStep > 0 && currentStep < 8 && (
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      )}

      {/* Screen Content */}
      <Animated.View style={[styles.screenContainer, { opacity: screenFadeAnim }]}>
        {renderScreen()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 3,
    backgroundColor: '#D4AF37',
    zIndex: 1000,
  },
  screenContainer: {
    flex: 1,
  },
});
