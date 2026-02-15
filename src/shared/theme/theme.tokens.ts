import { ThemeTokens } from './theme.types';

const lightColors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  primary: '#2563EB',
  secondary: '#64748B',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  error: '#DC2626',
  success: '#10B981',
  warning: '#F59E0B',
  cardBackground: '#FFFFFF',
  inputBackground: '#F8FAFC',
  buttonText: '#FFFFFF',
};

const darkColors = {
  background: '#0F172A',
  surface: '#1E293B',
  primary: '#3B82F6',
  secondary: '#94A3B8',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  error: '#EF4444',
  success: '#22C55E',
  warning: '#FBBF24',
  cardBackground: '#1E293B',
  inputBackground: '#334155',
  buttonText: '#FFFFFF',
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

const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
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
