import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface GenderSelectionScreenProps {
  onSelect: (gender: string) => void;
}

const GENDERS = [
  { id: 'women', label: 'Women', subtitle: 'Feminine styles & fits' },
  { id: 'men', label: 'Men', subtitle: 'Masculine styles & fits' },
  { id: 'all', label: 'Non-Binary / All', subtitle: 'All styles & fits' },
];

export default function GenderSelectionScreen({ onSelect }: GenderSelectionScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(GENDERS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Stagger card animations
    Animated.stagger(
      150,
      cardAnims.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  const handleSelect = (genderId: string) => {
    // Haptic feedback
    onSelect(genderId);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.question}>Which department fits your style?</Text>

        <View style={styles.cardsContainer}>
          {GENDERS.map((gender, index) => (
            <Animated.View
              key={gender.id}
              style={{
                opacity: cardAnims[index],
                transform: [
                  {
                    translateY: cardAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}
            >
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleSelect(gender.id)}
                activeOpacity={0.9}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardLabel}>{gender.label}</Text>
                  <Text style={styles.cardSubtitle}>{gender.subtitle}</Text>
                </View>
                <View style={styles.cardArrow}>
                  <Text style={styles.arrowText}>→</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
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
    paddingHorizontal: 24,
  },
  question: {
    fontSize: 32,
    fontWeight: '300',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 42,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 100,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '300',
  },
  cardArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  arrowText: {
    fontSize: 20,
    color: '#000000',
  },
});
