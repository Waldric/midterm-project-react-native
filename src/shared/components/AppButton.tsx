import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme/useTheme';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { tokens } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return tokens.colors.border;
    switch (variant) {
      case 'primary':
        return tokens.colors.primary;
      case 'secondary':
        return tokens.colors.secondary;
      case 'outline':
        return 'transparent';
      case 'danger':
        return tokens.colors.error;
      default:
        return tokens.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return tokens.colors.textSecondary;
    if (variant === 'outline') return tokens.colors.primary;
    return tokens.colors.buttonText;
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md };
      case 'medium':
        return { paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.lg };
      case 'large':
        return { paddingVertical: tokens.spacing.md, paddingHorizontal: tokens.spacing.xl };
      default:
        return { paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.lg };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return tokens.typography.sizes.sm;
      case 'medium':
        return tokens.typography.sizes.md;
      case 'large':
        return tokens.typography.sizes.lg;
      default:
        return tokens.typography.sizes.md;
    }
  };

  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: variant === 'outline' ? tokens.colors.primary : 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
          borderRadius: tokens.borderRadius.md,
          ...getPadding(),
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: getFontSize(),
              fontFamily: tokens.typography.fontFamily.semibold,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
