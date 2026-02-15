import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/shared/theme/ThemeProvider';
import { AppProvider } from './src/app/providers/AppProviders';
import { RootNavigator } from './src/app/navigation/RootNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <StatusBar style="auto" />
        <RootNavigator />
      </AppProvider>
    </ThemeProvider>
  );
}
