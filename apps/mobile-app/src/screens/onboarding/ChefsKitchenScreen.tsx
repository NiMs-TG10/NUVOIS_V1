import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

interface ChefsKitchenScreenProps {
  onComplete: () => void;
}

const LOADING_STEPS = [
  'Analyzing skeletal structure...',
  'Calculating color harmony...',
  'Scanning 5,000 items...',
  'Curating your first look...',
];

export default function ChefsKitchenScreen({ onComplete }: ChefsKitchenScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnims = useRef(
    LOADING_STEPS.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const showStep = (index: number) => {
      if (index >= LOADING_STEPS.length) {
        // All steps done, transition to home
        setTimeout(() => {
          Animated.timing(fadeAnims[fadeAnims.length - 1], {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }).start(() => {
            onComplete();
          });
        }, 800);
        return;
      }

      setCurrentStep(index);

      // Fade in
      Animated.timing(fadeAnims[index], {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        // Stay visible for a moment
        setTimeout(() => {
          // Fade out
          Animated.timing(fadeAnims[index], {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            // Show next step
            showStep(index + 1);
          });
        }, 1500);
      });
    };

    showStep(0);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {LOADING_STEPS.map((step, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.stepText,
              {
                opacity: fadeAnims[index],
                transform: [
                  {
                    translateY: fadeAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
              currentStep === index && styles.currentStepText,
            ]}
          >
            {step}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  stepText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    position: 'absolute',
  },
  currentStepText: {
    color: '#D4AF37',
  },
});
