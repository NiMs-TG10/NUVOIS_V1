import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
export default function AppInput(props: TextInputProps) {
  return <TextInput {...props} style={[styles.input, props.style]} placeholderTextColor="#888" />;
}
const styles = StyleSheet.create({ input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 } });
