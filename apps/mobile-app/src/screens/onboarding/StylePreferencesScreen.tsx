  // import React, { useRef, useEffect, useState } from 'react';
  // import {
  //   View,
  //   Text,
  //   StyleSheet,
  //   TouchableOpacity,
  //   Animated,
  //   ScrollView,
  //   Image,
  // } from 'react-native';

  // interface StylePreferencesScreenProps {
  //   onNext: (styles: string[]) => void;
  // }

  // const STYLE_IMAGES = [
  //   { id: 'minimalist', label: 'Minimalist', color: '#F5F5DC' },
  //   { id: 'streetwear', label: 'Streetwear', color: '#2C2C2C' },
  //   { id: 'formal', label: 'Formal', color: '#1A1A2E' },
  //   { id: 'casual', label: 'Casual', color: '#87CEEB' },
  //   { id: 'sporty', label: 'Sporty', color: '#FF6347' },
  //   { id: 'bohemian', label: 'Bohemian', color: '#D2691E' },
  //   { id: 'elegant', label: 'Elegant', color: '#C0C0C0' },
  //   { id: 'vintage', label: 'Vintage', color: '#8B4513' },
  // ];

  // export default function StylePreferencesScreen({ onNext }: StylePreferencesScreenProps) {
  //   const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  //   const fadeAnim = useRef(new Animated.Value(0)).current;

  //   useEffect(() => {
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 600,
  //       useNativeDriver: true,
  //     }).start();
  //   }, []);

  //   const toggleStyle = (styleId: string) => {
  //     setSelectedStyles((prev) =>
  //       prev.includes(styleId)
  //         ? prev.filter((s) => s !== styleId)
  //         : [...prev, styleId]
  //     );
  //   };

  //   const handleNext = () => {
  //     if (selectedStyles.length >= 3) {
  //       onNext(selectedStyles);
  //     }
  //   };

  //   return (
  //     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
  //       <View style={styles.header}>
  //         <Text style={styles.question}>Select the aesthetics that inspire you.</Text>
  //         <Text style={styles.hint}>Choose at least 3</Text>
  //       </View>

  //       <ScrollView
  //         style={styles.scrollView}
  //         contentContainerStyle={styles.gridContainer}
  //         showsVerticalScrollIndicator={false}
  //       >
  //         {STYLE_IMAGES.map((style) => {
  //           const isSelected = selectedStyles.includes(style.id);
  //           return (
  //             <TouchableOpacity
  //               key={style.id}
  //               style={[
  //                 styles.styleCard,
  //                 { backgroundColor: style.color },
  //                 isSelected && styles.styleCardSelected,
  //               ]}
  //               onPress={() => toggleStyle(style.id)}
  //               activeOpacity={0.8}
  //             >
  //               {isSelected && (
  //                 <View style={styles.heartOverlay}>
  //                   <Text style={styles.heartIcon}>❤️</Text>
  //                 </View>
  //               )}
  //               <View style={styles.labelContainer}>
  //                 <Text style={styles.styleLabel}>{style.label}</Text>
  //               </View>
  //             </TouchableOpacity>
  //           );
  //         })}
  //       </ScrollView>

  //       <View style={styles.footer}>
  //         <TouchableOpacity
  //           style={[
  //             styles.nextButton,
  //             selectedStyles.length < 3 && styles.nextButtonDisabled,
  //           ]}
  //           onPress={handleNext}
  //           disabled={selectedStyles.length < 3}
  //           activeOpacity={0.8}
  //         >
  //           <Text style={styles.nextButtonText}>
  //             {selectedStyles.length < 3
  //               ? `Select ${3 - selectedStyles.length} more`
  //               : 'Continue'}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Animated.View>
  //   );
  // }

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#FAFAFA',
  //   },
  //   header: {
  //     paddingTop: 60,
  //     paddingHorizontal: 24,
  //     marginBottom: 24,
  //   },
  //   question: {
  //     fontSize: 28,
  //     fontWeight: '300',
  //     color: '#000000',
  //     textAlign: 'center',
  //     marginBottom: 8,
  //     lineHeight: 36,
  //   },
  //   hint: {
  //     fontSize: 14,
  //     color: '#999999',
  //     textAlign: 'center',
  //     fontWeight: '300',
  //   },
  //   scrollView: {
  //     flex: 1,
  //   },
  //   gridContainer: {
  //     flexDirection: 'row',
  //     flexWrap: 'wrap',
  //     paddingHorizontal: 16,
  //     paddingBottom: 20,
  //     flexGrow: 1,
  //     // gap: 12,
  //   },
  //   styleCard: {
  //   width: '46.5%', // <-- DECREASE WIDTH to account for spacing
  //   aspectRatio: 0.75,
  //   borderRadius: 16,
  //   overflow: 'hidden',
  //   position: 'relative',
  //   marginBottom: 16, // <-- ADD BOTTOM MARGIN for vertical space
  //   marginHorizontal: '0.8%', // <-- ADD HORIZONTAL MARGIN for horizontal space (approx 1.5% total gap)
  // },
  //   styleCardSelected: {
  //     borderWidth: 3,
  //     borderColor: '#D4AF37',
  //   },
  //   heartOverlay: {
  //     ...StyleSheet.absoluteFillObject,
  //     backgroundColor: 'rgba(0, 0, 0, 0.3)',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  //   heartIcon: {
  //     fontSize: 48,
  //   },
  //   labelContainer: {
  //     position: 'absolute',
  //     bottom: 0,
  //     left: 0,
  //     right: 0,
  //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //     padding: 12,
  //   },
  //   styleLabel: {
  //     fontSize: 16,
  //     fontWeight: '500',
  //     color: '#FFFFFF',
  //     textAlign: 'center',
  //   },
  //   footer: {
  //     paddingHorizontal: 24,
  //     paddingBottom: 40,
  //     paddingTop: 16,
  //     backgroundColor: '#FAFAFA',
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
  //   nextButtonDisabled: {
  //     backgroundColor: '#CCCCCC',
  //     shadowOpacity: 0,
  //   },
  //   nextButtonText: {
  //     fontSize: 16,
  //     fontWeight: '600',
  //     color: '#000000',
  //     letterSpacing: 1,
  //   },
  // });
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image, // Used for displaying the images
  Animated,
  Dimensions, // Added for responsive card width calculation
} from 'react-native';

// Get screen width for dynamic styling
const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_PADDING_HORIZONTAL = 18;
const CARD_WIDTH = (width - CARD_PADDING_HORIZONTAL * 2 - CARD_MARGIN) / 2;

interface StylePreferencesScreenProps {
  onNext: (styles: string[]) => void;
}

// 🔑 Updated to use online image URIs instead of colors
const STYLE_IMAGES = [
  { id: 'minimalist', label: 'Minimalist', imageUri: 'https://images.unsplash.com/photo-1760089663992-af2a3506504f' },
  { id: 'streetwear', label: 'Streetwear', imageUri: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234' },
  { id: 'casual', label: 'Casual', imageUri: 'https://images.unsplash.com/photo-1604004382251-3d44b83d2903' },
 { id: 'bohemian', label: 'Bohemian', imageUri: 'https://images.unsplash.com/photo-1613485374005-6f92b42bd72a' },
  { id: 'formal', label: 'Formal', imageUri: 'https://unsplash.com/photos/a-man-and-woman-in-formal-wear-vhg0uvFiCKw' },
  
  { id: 'sporty', label: 'Sporty', imageUri: 'https://unsplash.com/photos/woman-in-black-sports-bra-and-black-shorts-Zm7_jw5mRJs' },
  
  { id: 'elegant', label: 'Elegant', imageUri: 'https://unsplash.com/photos/woman-in-a-light-blue-dress-standing-outdoors-gXhhpyn5Vtc' },
  { id: 'vintage', label: 'Vintage', imageUri: 'https://unsplash.com/photos/a-woman-in-a-dress-walking-by-a-lake-nDsM8QLBr9U' },
];

export default function StylePreferencesScreen({ onNext }: StylePreferencesScreenProps) {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const toggleStyle = (styleId: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleId)
        ? prev.filter((s) => s !== styleId)
        : [...prev, styleId]
    );
  };

  const handleNext = () => {
    if (selectedStyles.length >= 3) {
      onNext(selectedStyles);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.question}>Select the aesthetics that inspire you. ✨</Text>
        <Text style={styles.hint}>Choose at least 3</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {STYLE_IMAGES.map((style) => {
          const isSelected = selectedStyles.includes(style.id);
          return (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleCard,
                isSelected && styles.styleCardSelected,
              ]}
              onPress={() => toggleStyle(style.id)}
              activeOpacity={0.8}
            >
              {/* 🔑 New: Image component for the background */}
              <Image 
                source={{ uri: style.imageUri }} 
                style={styles.cardImage} 
                resizeMode="cover" 
              />
              
              {isSelected && (
                <View style={styles.heartOverlay}>
                  {/* <Text style={styles.heartIcon}>❤️</Text> */}
                </View>
              )}
              
              <View style={styles.labelContainer}>
                <Text style={styles.styleLabel}>{style.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            selectedStyles.length < 3 && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={selectedStyles.length < 3}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {selectedStyles.length < 3
              ? `Select ${3 - selectedStyles.length} more`
              : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  question: {
    fontSize: 28,
    fontWeight: '300',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 36,
  },
  hint: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    fontWeight: '300',
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: CARD_PADDING_HORIZONTAL,
    paddingBottom: 20,
    justifyContent: 'space-between', // Ensures space between the two columns
  },
  styleCard: {
    width: CARD_WIDTH, // Use calculated width
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: CARD_MARGIN,
    // Removed marginHorizontal as space-between handles it
  },
  // 🔑 New: Style for the Image component
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  styleCardSelected: {
    borderWidth: 3,
    borderColor: '#D4AF37',
  },
  heartOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure the heart is above the image but below the label
  },
  heartIcon: {
    fontSize: 48,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Increased opacity for readability over image
    padding: 12,
    zIndex: 2, // Ensure the label is always on top
  },
  styleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1, // Added visual separation
    borderTopColor: '#E0E0E0',
  },
  nextButton: {
    height: 56,
    backgroundColor: '#D4AF37',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 1,
  },
});
