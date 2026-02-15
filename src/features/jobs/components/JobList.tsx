import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Job } from '../types/job.types';
import { JobCard } from './JobCard';
import { EmptyState } from '../../../shared/components/EmptyState';
import { useTheme } from '../../../shared/theme/useTheme';

interface JobListProps {
  jobs: Job[];
  savedJobIds: string[];
  onJobPress: (job: Job) => void;
  onSavePress: (jobId: string) => void;
  onApplyPress: (job: Job) => void;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  showSaveButton?: boolean;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  savedJobIds,
  onJobPress,
  onSavePress,
  onApplyPress,
  isLoading = false,
  emptyTitle = 'No Jobs Found',
  emptyMessage = 'Try adjusting your search criteria',
  showSaveButton = true,
}) => {
  const { tokens } = useTheme();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={tokens.colors.primary} />
      </View>
    );
  }

  if (jobs.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} icon="🔍" />;
  }

  return (
    <FlatList
      data={jobs}
      renderItem={({ item }) => (
        <JobCard
          job={item}
          isSaved={savedJobIds.includes(item.id)}
          onPress={() => onJobPress(item)}
          onSavePress={() => onSavePress(item.id)}
          onApplyPress={() => onApplyPress(item)}
          showSaveButton={showSaveButton}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
});
