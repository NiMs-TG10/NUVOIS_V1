import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface AgeSelectionScreenProps {
  onNext: (age: number) => void;
}

const AGES = Array.from({ length: 65 }, (_, i) => i + 16); // 16 to 80

export default function AgeSelectionScreen({ onNext }: AgeSelectionScreenProps) {
  const [selectedAge, setSelectedAge] = useState(25);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Scroll to initial age
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: (selectedAge - 16) * 80,
        animated: true,
      });
    }, 300);
  }, []);

  const handleNext = () => {
    onNext(selectedAge);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.question}>And your age?</Text>

        <View style={styles.pickerContainer}>
          <View style={styles.centerIndicator} />
          
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={80}
            decelerationRate="fast"
            contentContainerStyle={styles.scrollContent}
            onMomentumScrollEnd={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(offsetX / 80);
              setSelectedAge(AGES[index] || 25);
            }}
          >
            {AGES.map((age) => (
              <TouchableOpacity
                key={age}
                style={styles.ageItem}
                onPress={() => {
                  setSelectedAge(age);
                  scrollViewRef.current?.scrollTo({
                    x: (age - 16) * 80,
                    animated: true,
                  });
                }}
              >
                <Text
                  style={[
                    styles.ageText,
                    age === selectedAge && styles.ageTextSelected,
                  ]}
                >
                  {age}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 32,
  },
  question: {
    fontSize: 32,
    fontWeight: '300',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 80,
  },
  pickerContainer: {
    height: 120,
    justifyContent: 'center',
    marginBottom: 60,
    position: 'relative',
  },
  centerIndicator: {
    position: 'absolute',
    left: '50%',
    marginLeft: -40,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#D4AF37',
    borderRadius: 40,
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 160,
    alignItems: 'center',
  },
  ageItem: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageText: {
    fontSize: 28,
    fontWeight: '300',
    color: '#CCCCCC',
  },
  ageTextSelected: {
    fontSize: 48,
    fontWeight: '400',
    color: '#000000',
  },
  nextButton: {
    height: 56,
    backgroundColor: '#D4AF37',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 1,
  },
});
