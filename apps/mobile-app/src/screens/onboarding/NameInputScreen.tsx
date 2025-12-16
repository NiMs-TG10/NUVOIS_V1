// import React, { useRef, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Animated,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';

// interface NameInputScreenProps {
//   onNext: (name: string) => void;
// }

// export default function NameInputScreen({ onNext }: NameInputScreenProps) {
//   const [name, setName] = useState('');
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const buttonGlow = useRef(new Animated.Value(0)).current;
//   const inputRef = useRef<TextInput>(null);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 600,
//       useNativeDriver: true,
//     }).start();

//     // Auto-focus input
//     setTimeout(() => inputRef.current?.focus(), 300);
//   }, []);

//   useEffect(() => {
//     if (name.length > 0) {
//       Animated.timing(buttonGlow, {
//         toValue: 1,
//         duration: 400,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(buttonGlow, {
//         toValue: 0,
//         duration: 400,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [name]);

//   const handleSubmit = () => {
//     if (name.trim().length > 0) {
//       Keyboard.dismiss();
//       onNext(name.trim());
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//         <Text style={styles.question}>First, how should we address you?</Text>

//         <TextInput
//           ref={inputRef}
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//           onSubmitEditing={handleSubmit}
//           placeholder="Your name"
//           placeholderTextColor="rgba(0, 0, 0, 0.3)"
//           returnKeyType="next"
//           autoCapitalize="words"
//           autoCorrect={false}
//         />

//         <Animated.View
//           style={[
//             styles.nextButton,
//             {
//               opacity: buttonGlow,
//               transform: [
//                 {
//                   scale: buttonGlow.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.95, 1],
//                   }),
//                 },
//               ],
//             },
//           ]}
//         >
//           <Text style={styles.nextButtonText}>Next</Text>
//         </Animated.View>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 32,
//   },
//   question: {
//     fontSize: 28,
//     fontWeight: '300',
//     color: '#000000',
//     textAlign: 'center',
//     marginBottom: 60,
//     lineHeight: 38,
//   },
//   input: {
//     fontSize: 32,
//     fontWeight: '300',
//     color: '#000000',
//     textAlign: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: '#D4AF37',
//     paddingVertical: 16,
//     marginBottom: 40,
//   },
//   nextButton: {
//     height: 56,
//     backgroundColor: '#D4AF37',
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#D4AF37',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 12,
//     elevation: 6,
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
  TextInput,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity, // Import TouchableOpacity for the button
} from 'react-native';

interface NameInputScreenProps {
  onNext: (name: string) => void;
}

export default function NameInputScreen({ onNext }: NameInputScreenProps) {
  const [name, setName] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonGlow = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);
  
  // Determine if the name is valid (i.e., not just empty or whitespace)
  const isNameValid = name.trim().length > 0;

  useEffect(() => {
    // 1. Initial fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 2. Auto-focus input
    // Added a check for Platform.OS to ensure focus only runs on platforms where it's safe (e.g., iOS/Android)
    if (Platform.OS !== 'web') {
        setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, []);

  useEffect(() => {
    // Animate the button based on name validity (enable/disable visual feedback)
    Animated.timing(buttonGlow, {
      toValue: isNameValid ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [name, isNameValid]);

  const handleSubmit = () => {
    if (isNameValid) {
      Keyboard.dismiss();
      onNext(name.trim());
    }
  };

  // Interpolated style for the button, including disabled state visual
  const buttonStyle = {
    opacity: buttonGlow.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1], // Button is semi-transparent when invalid
    }),
    transform: [
      {
        scale: buttonGlow.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1], // Subtle scaling when valid
        }),
      },
    ],
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100} // Adjust for better positioning
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.question}>First, how should we address you? 👋</Text>

        <TextInput
          ref={inputRef}
          style={[styles.input, isNameValid ? styles.inputActive : styles.inputInactive]}
          value={name}
          onChangeText={setName}
          onSubmitEditing={handleSubmit}
          placeholder="Your name"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          returnKeyType="done" // Changed from 'next' since this is the final input
          autoCapitalize="words"
          autoCorrect={false}
          maxLength={50} // Good practice to limit length
        />

        {/* FIX: Wrap the animated button in a TouchableOpacity */}
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={!isNameValid} // Disable touch interaction when name is invalid
        >
          <Animated.View
            style={[
              styles.nextButton,
              buttonStyle,
              // Apply shadow only when valid (buttonGlow = 1)
              isNameValid ? styles.nextButtonShadow : null,
            ]}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    // Add margin at the bottom for keyboard avoidance space
    paddingBottom: 50,
  },
  question: {
    fontSize: 28,
    fontWeight: '300',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 38,
  },
  input: {
    fontSize: 32,
    fontWeight: '300',
    color: '#000000',
    textAlign: 'center',
    borderBottomWidth: 2,
    paddingVertical: 16,
    marginBottom: 40,
  },
  // Added dynamic styles for the input border color
  inputActive: {
    borderBottomColor: '#D4AF37',
  },
  inputInactive: {
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  nextButton: {
    height: 56,
    backgroundColor: '#D4AF37',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    // Base shadow styles removed here and moved to nextButtonShadow
  },
  nextButtonShadow: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 1,
  },
});
