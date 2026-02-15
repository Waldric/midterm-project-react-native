import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../../shared/theme/useTheme';
import { RootStackParamList, ROUTES } from './routes';
import { JobsHomeScreen } from '../../features/jobs/screens/JobsHomeScreen';
import { SavedJobsScreen } from '../../features/saved/screens/SavedJobsScreen';
import { JobDetailsScreen } from '../../features/jobs/screens/JobDetailsScreen';
import { ApplicationFormScreen } from '../../features/application/screens/ApplicationFormScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { tokens } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.JOBS_HOME}
        screenOptions={{
          headerStyle: {
            backgroundColor: tokens.colors.background,
          },
          headerTintColor: tokens.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: tokens.colors.background,
          },
        }}
      >
        <Stack.Screen
          name={ROUTES.JOBS_HOME}
          component={JobsHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.SAVED_JOBS}
          component={SavedJobsScreen}
          options={{ title: 'Saved Jobs' }}
        />
        <Stack.Screen
          name={ROUTES.JOB_DETAILS}
          component={JobDetailsScreen}
          options={{ title: 'Job Details' }}
        />
        <Stack.Screen
          name={ROUTES.APPLICATION_FORM}
          component={ApplicationFormScreen}
          options={{ title: 'Apply for Job' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
