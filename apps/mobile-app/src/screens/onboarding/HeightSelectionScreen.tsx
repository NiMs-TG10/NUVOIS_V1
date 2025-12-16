// import React, { useRef, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   PanResponder,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';

// const { height } = Dimensions.get('window');

// interface HeightSelectionScreenProps {
//   onNext: (heightCm: number) => void;
// }

// const MIN_HEIGHT_CM = 140;
// const MAX_HEIGHT_CM = 220;
// const RULER_HEIGHT = height * 0.5;

// export default function HeightSelectionScreen({ onNext }: HeightSelectionScreenProps) {
//   const [heightCm, setHeightCm] = useState(170);
//   const [isCm, setIsCm] = useState(true);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const pan = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 600,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gestureState) => {
//         const newHeight = heightCm - Math.round(gestureState.dy / 3);
//         const clampedHeight = Math.max(MIN_HEIGHT_CM, Math.min(MAX_HEIGHT_CM, newHeight));
//         setHeightCm(clampedHeight);
//       },
//       onPanResponderRelease: () => {},
//     })
//   ).current;

//   const displayHeight = isCm 
//     ? `${heightCm} cm` 
//     : `${Math.floor(heightCm / 2.54 / 12)}' ${Math.round((heightCm / 2.54) % 12)}"`;

//   const handleNext = () => {
//     onNext(heightCm);
//   };

//   return (
//     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
//       <View style={styles.content}>
//         <Text style={styles.question}>To calibrate your fit, we need your height.</Text>

//         <View style={styles.rulerContainer}>
//           {/* Ruler marks */}
//           <View style={styles.ruler}>
//             {Array.from({ length: 17 }, (_, i) => {
//               const height = MIN_HEIGHT_CM + i * 5;
//               const isMain = i % 2 === 0;
//               return (
//                 <View key={i} style={styles.markRow}>
//                   <View style={[styles.mark, isMain && styles.markMain]} />
//                   {isMain && <Text style={styles.markLabel}>{height}</Text>}
//                 </View>
//               );
//             })}
//           </View>

//           {/* Interactive slider */}
//           <View style={styles.sliderContainer} {...panResponder.panHandlers}>
//             <View style={styles.centerLine} />
//             <View style={styles.heightDisplay}>
//               <Text style={styles.heightText}>{displayHeight}</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.controls}>
//           <TouchableOpacity
//             style={styles.unitToggle}
//             onPress={() => setIsCm(!isCm)}
//             activeOpacity={0.7}
//           >
//             <Text style={[styles.unitText, isCm && styles.unitActive]}>cm</Text>
//             <Text style={styles.unitSeparator}>|</Text>
//             <Text style={[styles.unitText, !isCm && styles.unitActive]}>ft</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.nextButton}
//             onPress={handleNext}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.nextButtonText}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F8F8',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 32,
//     paddingTop: 60,
//   },
//   question: {
//     fontSize: 26,
//     fontWeight: '300',
//     color: '#000000',
//     textAlign: 'center',
//     marginBottom: 40,
//     lineHeight: 36,
//   },
//   rulerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   ruler: {
//     height: RULER_HEIGHT,
//     justifyContent: 'space-between',
//     paddingVertical: 20,
//   },
//   markRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 20,
//   },
//   mark: {
//     width: 20,
//     height: 1,
//     backgroundColor: '#CCCCCC',
//   },
//   markMain: {
//     width: 40,
//     height: 2,
//     backgroundColor: '#999999',
//   },
//   markLabel: {
//     fontSize: 12,
//     color: '#999999',
//     marginLeft: 8,
//     fontWeight: '300',
//   },
//   sliderContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centerLine: {
//     width: 100,
//     height: 3,
//     backgroundColor: '#D4AF37',
//     position: 'absolute',
//   },
//   heightDisplay: {
//     backgroundColor: '#D4AF37',
//     paddingHorizontal: 32,
//     paddingVertical: 16,
//     borderRadius: 30,
//     shadowColor: '#D4AF37',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   heightText: {
//     fontSize: 48,
//     fontWeight: '300',
//     color: '#000000',
//     letterSpacing: 2,
//   },
//   controls: {
//     paddingBottom: 40,
//     gap: 16,
//   },
//   unitToggle: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 12,
//     gap: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   unitText: {
//     fontSize: 16,
//     color: '#999999',
//     fontWeight: '500',
//   },
//   unitActive: {
//     color: '#D4AF37',
//     fontWeight: '700',
//   },
//   unitSeparator: {
//     color: '#DDDDDD',
//     fontSize: 16,
//   },
//   nextButton: {
//     height: 56,
//     backgroundColor: '#D4AF37',
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#D4AF37',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   nextButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000000',
//     letterSpacing: 1,
//   },
// });
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
// Note: React Native does not have a built-in Slider in core, 
// but most projects use @react-native-community/slider. 
// For a standard solution, we'll use a placeholder structure 
// that is easily adaptable to a slider component, while simplifying 
// the component's existing drag logic.

// If you install '@react-native-community/slider', replace the slider placeholder 
// with the actual component:
// import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

interface HeightSelectionScreenProps {
  onNext: (heightCm: number) => void;
}

const MIN_HEIGHT_CM = 140;
const MAX_HEIGHT_CM = 220;

// Reverting to simpler constants as PanResponder is removed
const ACTIVE_COLOR = '#D4AF37'; // Gold/Yellow
const INACTIVE_COLOR = '#CCCCCC';

// Note: Removed RULER_HEIGHT, CM_PER_PIXEL_SCALE, rulerPan, panResponder

export default function HeightSelectionScreen({ onNext }: HeightSelectionScreenProps) {
  // Use 'height' to match the Next.js component variable name, for clarity
  const [heightCm, setHeightCm] = useState(170);
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm'); // Use string union for clarity
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Use 'unit' state to determine isCm
  const isCm = unit === 'cm';
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Convert height logic directly from the Next.js component
  const convertHeight = (cm: number) => {
    if (unit === "cm") return `${cm} cm`;
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}' ${inches}"`;
  };

  const displayHeight = convertHeight(heightCm);

  const handleNext = () => {
    onNext(heightCm);
  };
  
  // New handler for slider/range input equivalent
  const handleHeightChange = (value: number) => {
    // Ensure the value is clamped and a whole number (as is typical for height)
    const clampedHeight = Math.max(MIN_HEIGHT_CM, Math.min(MAX_HEIGHT_CM, Math.round(value)));
    setHeightCm(clampedHeight);
  };

  // Calculate the slider progress for the background gradient (inspired by Next.js code)
  const progressPercent = ((heightCm - MIN_HEIGHT_CM) / (MAX_HEIGHT_CM - MIN_HEIGHT_CM)) * 100;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.question}>To calibrate your fit, we need your height.</Text>

        <View style={styles.centerSection}>
            {/* Height Display - Directly matching the Next.js component structure and style */}
            <View style={styles.heightDisplayContainer}>
                <Text style={styles.heightText}>
                    {displayHeight}
                </Text>
                <Text style={styles.unitLabel}>
                    {unit === 'cm' ? 'centimeters' : 'feet & inches'}
                </Text>
            </View>

            {/* Ruler Slider Placeholder (Replace with actual Slider component if installed) */}
            <View style={styles.sliderWrapper}>
                {/* --- START Slider Component Placeholder --- */}
                <View
                    style={[
                        styles.sliderTrack,
                        { 
                            // Simulate background gradient for visual feedback
                            backgroundColor: INACTIVE_COLOR,
                        }
                    ]}
                >
                    <View style={[styles.sliderProgress, { width: `${progressPercent}%` }]} />
                    <View style={[
                        styles.sliderThumb, 
                        { left: `${progressPercent}%` }
                    ]} />
                </View>
                {/* Note: In a real app, you would use a Slider component here.
                    For example:
                    <Slider
                        style={styles.fullWidth}
                        minimumValue={MIN_HEIGHT_CM}
                        maximumValue={MAX_HEIGHT_CM}
                        step={1}
                        value={heightCm}
                        onValueChange={handleHeightChange}
                        minimumTrackTintColor={ACTIVE_COLOR}
                        maximumTrackTintColor={INACTIVE_COLOR}
                        thumbTintColor={ACTIVE_COLOR}
                    />
                */}
                {/* --- END Slider Component Placeholder --- */}

                <View style={styles.rulerLabelRow}>
                    <Text style={styles.rulerLabel}>140 cm</Text>
                    <Text style={styles.rulerLabel}>220 cm</Text>
                </View>
            </View>
        </View>

        <View style={styles.controls}>
          {/* Unit Toggle - Matching the Next.js button layout */}
          <View style={styles.unitToggleRow}>
            <TouchableOpacity
              style={[styles.unitButton, isCm && styles.unitButtonActive]}
              onPress={() => setUnit('cm')}
              activeOpacity={0.7}
            >
              <Text style={[styles.unitText, isCm && styles.unitTextActive]}>cm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.unitButton, !isCm && styles.unitButtonActive]}
              onPress={() => setUnit('ft')}
              activeOpacity={0.7}
            >
              <Text style={[styles.unitText, !isCm && styles.unitTextActive]}>ft</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
    justifyContent: 'space-between', // Align content
  },
  question: {
    fontSize: 26,
    fontWeight: '300',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 36,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  // --- Height Display Styles (from Next.js code) ---
  heightDisplayContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heightText: {
    fontSize: 60, // Larger size to match Next.js
    fontWeight: '300',
    color: '#1A1A1A',
  },
  unitLabel: {
    fontSize: 14,
    color: '#1A1A1A7F', // Transparent black for dim effect
    marginTop: 8,
  },
  // --- Slider Placeholder Styles (replaces PanResponder ruler) ---
  sliderWrapper: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  // This group simulates the look of the HTML range input
  sliderTrack: {
    height: 8,
    width: '100%',
    borderRadius: 4,
    position: 'relative',
  },
  sliderProgress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: ACTIVE_COLOR,
    position: 'absolute',
    left: 0,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ACTIVE_COLOR,
    // Center the thumb visually
    top: -8, 
    marginLeft: -12, // Half the width to center on the 'left' percentage
    shadowColor: ACTIVE_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  rulerLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  rulerLabel: {
    fontSize: 12,
    color: '#1A1A1A66',
  },
  fullWidth: {
    width: '100%',
  },
  // --- Controls and Unit Toggle Styles ---
  controls: {
    paddingBottom: 40,
    gap: 16,
  },
  unitToggleRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8, // Matching Next.js gap
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1A1A1A33', // Border color from Next.js
  },
  unitButtonActive: {
    backgroundColor: '#1A1A1A', // Active background color from Next.js
    borderColor: '#1A1A1A',
  },
  unitText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  unitTextActive: {
    color: '#FFFFFF',
  },
  // Removed unitSeparator as it's not needed with separate buttons
  nextButton: {
    height: 56,
    backgroundColor: ACTIVE_COLOR,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: ACTIVE_COLOR,
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