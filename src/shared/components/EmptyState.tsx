import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/useTheme";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon = "📭",
}) => {
  const { tokens } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text
        style={[
          styles.title,
          {
            color: tokens.colors.text,
            fontSize: tokens.typography.sizes.lg,
            fontFamily: tokens.typography.fontFamily.semibold,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.message,
          {
            color: tokens.colors.textSecondary,
            fontSize: tokens.typography.sizes.md,
          },
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    textAlign: "center",
    lineHeight: 22,
  },
});
