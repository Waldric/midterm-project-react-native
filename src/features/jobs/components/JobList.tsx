import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { JobCard } from "./JobCard";
import { Job } from "../types/job.types";
import { useTheme } from "../../../shared/theme/useTheme";

interface JobListProps {
  jobs: Job[];
  savedJobIds: string[];
  onJobPress: (job: Job) => void;
  onSavePress: (jobId: string) => void;
  onApplyPress: (job: Job) => void;
  isJobApplied: (jobId: string) => boolean;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  savedJobIds,
  onJobPress,
  onSavePress,
  onApplyPress,
  isJobApplied,
  isLoading = false,
  emptyTitle = "No Jobs Available",
  emptyMessage = "Check back later for new opportunities",
}) => {
  const { tokens } = useTheme();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={tokens.colors.primary} />
        <Text
          style={[
            styles.loadingText,
            {
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.sizes.md,
              marginTop: tokens.spacing.md,
            },
          ]}
        >
          Loading jobs...
        </Text>
      </View>
    );
  }

  if (jobs.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text
          style={[
            styles.emptyTitle,
            {
              color: tokens.colors.text,
              fontSize: tokens.typography.sizes.xl,
              fontFamily: tokens.typography.fontFamily.semibold,
            },
          ]}
        >
          {emptyTitle}
        </Text>
        <Text
          style={[
            styles.emptyMessage,
            {
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.sizes.md,
              marginTop: tokens.spacing.sm,
            },
          ]}
        >
          {emptyMessage}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={jobs}
      renderItem={({ item }) => (
        <JobCard
          job={item}
          isSaved={savedJobIds.includes(item.id)}
          isApplied={isJobApplied(item.id)}
          onPress={() => onJobPress(item)}
          onSavePress={() => onSavePress(item.id)}
          onApplyPress={() => onApplyPress(item)}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        styles.listContent,
        {
          padding: tokens.spacing.lg,
        },
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    textAlign: "center",
  },
  emptyTitle: {
    textAlign: "center",
  },
  emptyMessage: {
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 32,
  },
});
