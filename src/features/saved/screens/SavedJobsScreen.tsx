import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';
import { useApp } from '../../../app/providers/AppProviders';
import { useTheme } from '../../../shared/theme/useTheme';
import { Job } from '../../jobs/types/job.types';
import { RootStackParamList, ROUTES } from '../../../app/navigation/routes';
import { FlatList } from 'react-native';
import { SavedJobCard } from '../components/SavedJobCard';
import { EmptyState } from '../../../shared/components/EmptyState';

type SavedJobsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SavedJobs'>;

export const SavedJobsScreen: React.FC = () => {
  const navigation = useNavigation<SavedJobsScreenNavigationProp>();
  const { getSavedJobs, removeJob } = useApp();
  const { tokens } = useTheme();
  const savedJobs = getSavedJobs();

  const handleJobPress = (job: Job) => {
    navigation.navigate(ROUTES.JOB_DETAILS, { job });
  };

  const handleApplyPress = (job: Job) => {
    navigation.navigate(ROUTES.APPLICATION_FORM, { job, fromSavedJobs: true });
  };

  const handleRemovePress = (jobId: string) => {
    removeJob(jobId);
  };

  if (savedJobs.length === 0) {
    return (
      <ScreenContainer>
        <View style={[styles.header, { backgroundColor: tokens.colors.background }]}>
          <Text
            style={[
              styles.headerTitle,
              {
                color: tokens.colors.text,
                fontSize: tokens.typography.sizes.xxl,
                fontWeight: tokens.typography.weights.bold,
              },
            ]}
          >
            Saved Jobs
          </Text>
        </View>
        <EmptyState
          title="No Saved Jobs"
          message="Start saving jobs to see them here"
          icon="💾"
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={[styles.header, { backgroundColor: tokens.colors.background }]}>
        <Text
          style={[
            styles.headerTitle,
            {
              color: tokens.colors.text,
              fontSize: tokens.typography.sizes.xxl,
              fontWeight: tokens.typography.weights.bold,
            },
          ]}
        >
          Saved Jobs
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            {
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.sizes.md,
              marginTop: tokens.spacing.xs,
            },
          ]}
        >
          {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
        </Text>
      </View>

      <FlatList
        data={savedJobs}
        renderItem={({ item }) => (
          <SavedJobCard
            job={item}
            onPress={() => handleJobPress(item)}
            onApplyPress={() => handleApplyPress(item)}
            onRemovePress={() => handleRemovePress(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {},
  headerSubtitle: {},
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
});
