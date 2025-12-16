import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(20)).current;
  const buttonAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(titleAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnim, {
          toValue: 0,
          duration: 800,
          delay: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        
        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim },
          ]}
        >
          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: titleAnim.interpolate({
                  inputRange: [0, 20],
                  outputRange: [1, 0],
                }),
                transform: [{ translateY: titleAnim }],
              },
            ]}
          >
            <Text style={styles.brandText}>NUVOIS</Text>
            <Text style={styles.title}>
              Style, Perfected by{'\n'}
              <Text style={styles.titleItalic}>Intelligence</Text>.
            </Text>
            <Text style={styles.subtitle}>
              Your personal AI stylist, tailored to your body and closet.
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: buttonAnim.interpolate({
                  inputRange: [0, 20],
                  outputRange: [1, 0],
                }),
                transform: [{ translateY: buttonAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={onNext}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <View style={styles.arrow}>
                <Text style={styles.arrowText}>→</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  brandText: {
    color: '#D4AF37',
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: '500',
    marginBottom: 8,
  },
  title: {
    fontSize: 40,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: 48,
    marginBottom: 16,
  },
  titleItalic: {
    fontStyle: 'italic',
    color: '#D4AF37',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: 22,
    maxWidth: 280,
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    position: 'relative',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1,
  },
  arrow: {
    position: 'absolute',
    right: 8,
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  arrowText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
