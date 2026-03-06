import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../../../shared/theme/useTheme';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  touched, 
  ...inputProps 
}) => {
  const { tokens } = useTheme();
  const showError = error && touched;

  return (
    <View style={[styles.field, { marginBottom: tokens.spacing.md }]}>
      <Text
        style={[
          styles.label,
          {
            color: tokens.colors.text,
            fontSize: tokens.typography.sizes.md,
            fontFamily: tokens.typography.fontFamily.medium,
            marginBottom: tokens.spacing.xs,
          },
        ]}
      >
        {label}
      </Text>
      <TextInput
        style={[
          inputProps.multiline ? styles.textArea : styles.input,
          {
            backgroundColor: tokens.colors.inputBackground,
            borderColor: showError ? tokens.colors.error : tokens.colors.border,
            borderRadius: tokens.borderRadius.md,
            color: tokens.colors.text,
            fontSize: tokens.typography.sizes.md,
            fontFamily: tokens.typography.fontFamily.regular,
          },
        ]}
        placeholderTextColor={tokens.colors.textSecondary}
        {...inputProps}
      />
      {showError && (
        <Text
          style={[
            styles.errorText,
            {
              color: tokens.colors.error,
              fontSize: tokens.typography.sizes.sm,
              fontFamily: tokens.typography.fontFamily.regular,
              marginTop: tokens.spacing.xs,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  field: {},
  label: {},
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textArea: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 120,
  },
  errorText: {},
});