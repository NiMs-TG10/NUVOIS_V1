import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface VogueCoverScreenProps {
  onNext: () => void;
}

export default function VogueCoverScreen({ onNext }: VogueCoverScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(30)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(logoAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(textAnim, {
          toValue: 0,
          duration: 1000,
          delay: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtle pulse animation for the button
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleSlideToBegin = () => {
    // Haptic feedback would go here
    if (Platform.OS === 'ios') {
      // Haptic feedback for iOS
    }
    onNext();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' }}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Dark gradient overlay */}
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />

        {/* Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {/* Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoAnim,
                transform: [
                  {
                    scale: logoAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.logo}>NUVOIS</Text>
          </Animated.View>

          {/* Headline and Subtext */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: textAnim.interpolate({
                  inputRange: [0, 30],
                  outputRange: [1, 0],
                }),
                transform: [{ translateY: textAnim }],
              },
            ]}
          >
            <Text style={styles.headline}>
              Style, Perfected by{'\n'}
              <Text style={styles.headlineItalic}>Intelligence</Text>.
            </Text>
            <Text style={styles.subtext}>
              Your personal AI stylist, tailored to your body and closet.
            </Text>
          </Animated.View>

          {/* Slide to Begin Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: buttonAnim,
                transform: [
                  {
                    translateY: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.slideButton}
              onPress={handleSlideToBegin}
              activeOpacity={0.9}
            >
              <View style={styles.slideButtonInner}>
                <Animated.View
                  style={[
                    styles.slideIndicator,
                    {
                      opacity: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                      }),
                    },
                  ]}
                >
                  <Text style={styles.slideArrow}>→</Text>
                </Animated.View>
                <Text style={styles.slideText}>Slide to Begin</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: 12,
    color: '#D4AF37',
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  headline: {
    fontSize: 42,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 52,
    marginBottom: 20,
  },
  headlineItalic: {
    fontStyle: 'italic',
    color: '#D4AF37',
    fontWeight: '400',
  },
  subtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: 24,
    maxWidth: 320,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  slideButton: {
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.5)',
    overflow: 'hidden',
  },
  slideButtonInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  slideIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 8,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  slideArrow: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  slideText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
