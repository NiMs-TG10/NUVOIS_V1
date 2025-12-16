import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../../store/AuthContext';

interface AtelierEntryScreenProps {
  onContinue: () => void;
}

export default function AtelierEntryScreen({ onContinue }: AtelierEntryScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { signInWithGoogle } = useAuth();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      // For now, we'll skip to the next screen
      // In production, integrate with expo-auth-session or @react-native-google-signin/google-signin
      Alert.alert(
        'Google Sign-In',
        'Google authentication will be integrated here. Continuing with demo...',
        [{ text: 'OK', onPress: onContinue }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google');
      console.error('Google sign in error:', error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      // For now, we'll skip to the next screen
      // In production, integrate with expo-apple-authentication
      Alert.alert(
        'Apple Sign-In',
        'Apple authentication will be integrated here. Continuing with demo...',
        [{ text: 'OK', onPress: onContinue }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Apple');
      console.error('Apple sign in error:', error);
    }
  };

  const handlePhoneSignIn = () => {
    // For now, just continue
    Alert.alert(
      'Phone Sign-In',
      'Phone authentication will be integrated here. Continuing with demo...',
      [{ text: 'OK', onPress: onContinue }]
    );
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.header}>Welcome to Nuvois.</Text>

        <View style={styles.buttonGroup}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={[styles.socialButton, styles.appleButton]}
              onPress={handleAppleSignIn}
              activeOpacity={0.8}
            >
              <Text style={styles.appleIcon}></Text>
              <Text style={styles.appleButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePhoneSignIn} style={styles.phoneLink}>
            <Text style={styles.phoneLinkText}>Use Phone Number</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          By joining, you agree to our Terms.
        </Text>
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
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  header: {
    fontSize: 36,
    fontWeight: '300',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 60,
    letterSpacing: 0.5,
  },
  buttonGroup: {
    gap: 16,
  },
  socialButton: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  appleButton: {
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  appleIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  phoneLink: {
    marginTop: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  phoneLinkText: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '500',
  },
  footer: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 40,
    fontWeight: '300',
  },
});
