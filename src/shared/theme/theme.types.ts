export interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  cardBackground: string;
  inputBackground: string;
  buttonText: string;
  cardStroke: string;
  tagBackground: string;
  savedJob: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeBorderRadius {
  sm: number;
  md: number;
  lg: number;
  full: number;
}

export interface ThemeFontFamily {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
}

export interface ThemeTypography {
  fontFamily: ThemeFontFamily; // ✅ Add this
  sizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

export interface ThemeTokens {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  typography: ThemeTypography;
}

export type ThemeMode = "light" | "dark";
export type Theme = ThemeMode;
