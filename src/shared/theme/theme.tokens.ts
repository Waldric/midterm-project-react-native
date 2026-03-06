import { ThemeTokens } from "./theme.types";

const lightColors = {
  background: "#FFFFFF",
  backgroundSecondary: "#F5F5F5",
  surface: "#F5F5F5",
  primary: "#022658",
  secondary: "#64748B",
  text: "#1E293B",
  textSecondary: "#64748B",
  border: "#E2E8F0",
  error: "#DC2626",
  success: "#10B981",
  warning: "#F59E0B",
  cardBackground: "#FFFFFF",
  inputBackground: "#F8FAFC",
  buttonText: "#FFFFFF",
  cardStroke: "#DEDEDE",
  tagBackground: "#f0f0f0",
  savedJob: "rgba(12, 44, 99, 0.29)",
};

const darkColors = {
  background: "#0F172A",
  backgroundSecondary: "#4f5a6b",
  surface: "#1E293B",
  primary: "#1270b3",
  secondary: "#94A3B8",
  text: "#F1F5F9",
  textSecondary: "#94A3B8",
  border: "#334155",
  error: "#EF4444",
  success: "rgba(45, 212, 191, 0.1)",
  warning: "#FBBF24",
  cardBackground: "#1E293B",
  inputBackground: "#334155",
  buttonText: "#FFFFFF",
  cardStroke: "#4B5563",
  tagBackground: "#374151",
  savedJob: "rgba(138, 148, 197, 0.17)",
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
};

const fontFamily = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

const typography = {
  fontFamily,
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
};

export const lightTheme: ThemeTokens = {
  colors: lightColors,
  spacing,
  borderRadius,
  typography,
};

export const darkTheme: ThemeTokens = {
  colors: darkColors,
  spacing,
  borderRadius,
  typography,
};
