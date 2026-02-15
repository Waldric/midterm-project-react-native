import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../../shared/theme/useTheme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search by job title...',
}) => {
  const { tokens } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.inputBackground,
          borderColor: tokens.colors.border,
          borderRadius: tokens.borderRadius.md,
        },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            color: tokens.colors.text,
            fontSize: tokens.typography.sizes.md,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    padding: 0,
  },
});
