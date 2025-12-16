import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
export default function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}
const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowOpacity: 0.1, shadowRadius: 8 }
});
