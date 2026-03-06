import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../../../shared/theme/useTheme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search jobs, location, work model...",
}) => {
  const { tokens } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.inputBackground,
          borderColor: tokens.colors.border,
          borderRadius: 10,
        },
      ]}
    >
      <MagnifyingGlassIcon
        size={20}
        color={tokens.colors.textSecondary}
        style={styles.icon}
      />
      <TextInput
        style={[
          styles.input,
          {
            color: tokens.colors.text,
            fontSize: tokens.typography.sizes.md,
            fontFamily: tokens.typography.fontFamily.regular,
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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 0,
  },
});
