// import React, { useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Animated,
// } from 'react-native';

// interface BodyAnalysisMethodScreenProps {
//   onSelectAI: () => void;
//   onSelectManual: () => void;
// }

// export default function BodyAnalysisMethodScreen({
//   onSelectAI,
//   onSelectManual,
// }: BodyAnalysisMethodScreenProps) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const topCardAnim = useRef(new Animated.Value(0)).current;
//   const bottomCardAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//       Animated.stagger(200, [
//         Animated.timing(topCardAnim, {
//           toValue: 1,
//           duration: 600,
//           useNativeDriver: true,
//         }),
//         Animated.timing(bottomCardAnim, {
//           toValue: 1,
//           duration: 600,
//           useNativeDriver: true,
//         }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
//       <View style={styles.content}>
//         <Text style={styles.question}>Let's analyze your unique proportions.</Text>

//         <View style={styles.optionsContainer}>
//           <Animated.View
//             style={{
//               opacity: topCardAnim,
//               transform: [
//                 {
//                   translateY: topCardAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [30, 0],
//                   }),
//                 },
//               ],
//             }}
//           >
//             <TouchableOpacity
//               style={[styles.optionCard, styles.aiCard]}
//               onPress={onSelectAI}
//               activeOpacity={0.9}
//             >
//               <View style={styles.recommendedBadge}>
//                 <Text style={styles.recommendedText}>RECOMMENDED</Text>
//               </View>
//               <View style={styles.iconContainer}>
//                 <Text style={styles.icon}>📸</Text>
//               </View>
//               <Text style={styles.optionTitle}>AI Body Scan</Text>
//               <Text style={styles.optionSubtitle}>
//                 Most Accurate. We scan your silhouette.
//               </Text>
//             </TouchableOpacity>
//           </Animated.View>

//           <Animated.View
//             style={{
//               opacity: bottomCardAnim,
//               transform: [
//                 {
//                   translateY: bottomCardAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [30, 0],
//                   }),
//                 },
//               ],
//             }}
//           >
//             <TouchableOpacity
//               style={[styles.optionCard, styles.manualCard]}
//               onPress={onSelectManual}
//               activeOpacity={0.9}
//             >
//               <View style={styles.iconContainer}>
//                 <Text style={styles.icon}>✏️</Text>
//               </View>
//               <Text style={styles.optionTitle}>Manual Entry</Text>
//               <Text style={styles.optionSubtitle}>
//                 I know my measurements.
//               </Text>
//             </TouchableOpacity>
//           </Animated.View>
//         </View>
//       </View>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//   },
//   content: {
//     flex: 1,
//     paddingTop: 80,
//     paddingHorizontal: 24,
//   },
//   question: {
//     fontSize: 28,
//     fontWeight: '300',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 60,
//     lineHeight: 38,
//   },
//   optionsContainer: {
//     flex: 1,
//     gap: 20,
//   },
//   optionCard: {
//     flex: 1,
//     borderRadius: 24,
//     padding: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   aiCard: {
//     backgroundColor: '#D4AF37',
//   },
//   manualCard: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   recommendedBadge: {
//     position: 'absolute',
//     top: 16,
//     right: 16,
//     backgroundColor: '#000000',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },
//   recommendedText: {
//     fontSize: 10,
//     fontWeight: '700',
//     color: '#D4AF37',
//     letterSpacing: 1,
//   },
//   iconContainer: {
//     marginBottom: 20,
//   },
//   icon: {
//     fontSize: 64,
//   },
//   optionTitle: {
//     fontSize: 28,
//     fontWeight: '500',
//     color: '#FFFFFF',
//     marginBottom: 12,
//   },
//   optionSubtitle: {
//     fontSize: 14,
//     fontWeight: '300',
//     color: 'rgba(255, 255, 255, 0.7)',
//     textAlign: 'center',
//     lineHeight: 20,
//   },
// });
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

interface BodyAnalysisMethodScreenProps {
  onSelectAI: () => void;
  onSelectManual: () => void;
}

export default function BodyAnalysisMethodScreen({
  onSelectAI,
  onSelectManual,
}: BodyAnalysisMethodScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const topCardAnim = useRef(new Animated.Value(0)).current;
  const bottomCardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.stagger(200, [
        Animated.timing(topCardAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bottomCardAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.question}>Let's analyze your unique proportions.</Text>

        <View style={styles.optionsContainer}>
          <Animated.View
            style={{
              opacity: topCardAnim,
              transform: [
                {
                  translateY: topCardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              style={[styles.optionCard, styles.aiCard]}
              onPress={onSelectAI}
              activeOpacity={0.9}
            >
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>RECOMMENDED</Text>
              </View>
              <View style={styles.iconContainer}>
                {/* Text style ensures the icon (emoji) inherits dark color */}
                <Text style={[styles.icon, styles.darkText]}>📸</Text>
              </View>
              {/* Applying darkText to be visible on the gold card */}
              <Text style={[styles.optionTitle, styles.darkText]}>AI Body Scan</Text>
              <Text style={[styles.optionSubtitle, styles.darkText]}>
                Most Accurate. We scan your silhouette.
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              opacity: bottomCardAnim,
              transform: [
                {
                  translateY: bottomCardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              style={[styles.optionCard, styles.manualCard]}
              onPress={onSelectManual}
              activeOpacity={0.9}
            >
              <View style={styles.iconContainer}>
                {/* Text style ensures the icon (emoji) inherits light color */}
                <Text style={[styles.icon, styles.lightText]}>✏️</Text>
              </View>
              {/* Applying lightText to be visible on the dark transparent card */}
              <Text style={[styles.optionTitle, styles.lightText]}>Manual Entry</Text>
              <Text style={[styles.optionSubtitle, styles.lightText]}>
                I know my measurements.
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  question: {
    fontSize: 28,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 38,
  },
  optionsContainer: {
    flex: 1,
    gap: 20,
  },
  optionCard: {
    flex: 1,
    borderRadius: 24,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  aiCard: {
    backgroundColor: '#D4AF37',
  },
  manualCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  recommendedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D4AF37',
    letterSpacing: 1,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    fontSize: 64,
  },
  
  // --- NEW/MODIFIED STYLES FOR VISIBILITY ---
  // Base text styles (color removed for component-specific color application)
  optionTitle: {
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 12,
  },
  optionSubtitle: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Specific color styles
  darkText: {
    color: '#000000', // Black text for the bright (AI) card
  },
  lightText: {
    color: '#FFFFFF', // White text for the dark (Manual) card
    // Note: OptionSubtitle on Manual card uses a light, slightly transparent white
    // for a better look on the dark background. We'll use this for the subtitle specifically.
  },
  // Subtitle specific to Manual Card for slight transparency
  manualSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
  }
  // --- END NEW/MODIFIED STYLES ---

});
