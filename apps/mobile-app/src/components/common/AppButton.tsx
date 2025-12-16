import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type AppButtonProps = { title: string; onPress: () => void; disabled?: boolean };
export default function AppButton({ title, onPress, disabled }: AppButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: { padding: 12, backgroundColor: '#111', borderRadius: 8 },
  disabled: { opacity: 0.6 },
  text: { color: '#fff', fontWeight: '600', textAlign: 'center' }
});
