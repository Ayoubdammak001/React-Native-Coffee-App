import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export default function Button({ title, onPress, style, disabled = false }: ButtonProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.submitButton,
        { backgroundColor: disabled ? '#CCCCCC' : theme.colors.primary },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.submitButtonText,
          disabled && styles.submitButtonTextDisabled,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    height: 48,
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonTextDisabled: {
    color: '#999999',
  },
});