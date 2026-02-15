import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';
import { SearchBar } from '../components/SearchBar';
import { JobList } from '../components/JobList';
import { useApp } from '../../../app/providers/AppProviders';
import { useTheme } from '../../../shared/theme/useTheme';
import { filterJobsBySearch } from '../utils/jobs.filters';
import { Job } from '../types/job.types';
import { RootStackParamList, ROUTES } from '../../../app/navigation/routes';

type JobsHomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'JobsHome'>;

export const JobsHomeScreen: React.FC = () => {
  const navigation = useNavigation<JobsHomeScreenNavigationProp>();
  const { jobs, savedJobIds, isLoading, fetchJobsData, saveJob, toggleTheme, theme } = useApp();
  const { tokens } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchJobsData();
  }, []);

  const filteredJobs = filterJobsBySearch(jobs, searchQuery);

  const handleJobPress = (job: Job) => {
    navigation.navigate(ROUTES.JOB_DETAILS, { job });
  };

  const handleSavePress = (jobId: string) => {
    saveJob(jobId);
  };

  const handleApplyPress = (job: Job) => {
    navigation.navigate(ROUTES.APPLICATION_FORM, { job, fromSavedJobs: false });
  };

  const handleSavedJobsPress = () => {
    navigation.navigate(ROUTES.SAVED_JOBS);
  };

  return (
    <ScreenContainer keyboardAware>
      <View style={[styles.header, { backgroundColor: tokens.colors.background }]}>
        <View style={styles.headerTop}>
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
            Job Finder
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={toggleTheme}
              style={[
                styles.themeButton,
                {
                  backgroundColor: tokens.colors.surface,
                  borderRadius: tokens.borderRadius.md,
                },
              ]}
            >
              <Text style={styles.themeIcon}>{theme === 'light' ? '🌙' : '☀️'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSavedJobsPress}
              style={[
                styles.savedButton,
                {
                  backgroundColor: tokens.colors.primary,
                  borderRadius: tokens.borderRadius.md,
                },
              ]}
            >
              <Text style={styles.savedButtonText}>💾 Saved ({savedJobIds.length})</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.searchContainer, { marginTop: tokens.spacing.md }]}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>
      </View>

      <JobList
        jobs={filteredJobs}
        savedJobIds={savedJobIds}
        onJobPress={handleJobPress}
        onSavePress={handleSavePress}
        onApplyPress={handleApplyPress}
        isLoading={isLoading}
        emptyTitle={searchQuery ? 'No Jobs Found' : 'No Jobs Available'}
        emptyMessage={
          searchQuery
            ? 'Try searching with different keywords'
            : 'Check back later for new opportunities'
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {},
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeIcon: {
    fontSize: 20,
  },
  savedButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {},
});
