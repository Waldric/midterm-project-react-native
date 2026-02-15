import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { Theme, ThemeTokens } from './theme.types';
import { lightTheme, darkTheme } from './theme.tokens';
import { loadTheme, saveTheme } from '../utils/storage';

interface ThemeState {
  theme: Theme;
  tokens: ThemeTokens;
}

type ThemeAction = 
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: Theme };

interface ThemeContextValue extends ThemeState {
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      return {
        theme: newTheme,
        tokens: newTheme === 'light' ? lightTheme : darkTheme,
      };
    case 'SET_THEME':
      return {
        theme: action.payload,
        tokens: action.payload === 'light' ? lightTheme : darkTheme,
      };
    default:
      return state;
  }
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: 'light',
    tokens: lightTheme,
  });

  useEffect(() => {
    const initializeTheme = async () => {
      const savedTheme = await loadTheme();
      if (savedTheme) {
        dispatch({ type: 'SET_THEME', payload: savedTheme });
      }
    };
    initializeTheme();
  }, []);

  useEffect(() => {
    saveTheme(state.theme);
  }, [state.theme]);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const value: ThemeContextValue = {
    ...state,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
