import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ScreenContainer } from "../../../shared/components/ScreenContainer";
import { useApp } from "../../../app/providers/AppProviders";
import { useTheme } from "../../../shared/theme/useTheme";
import { Job } from "../../jobs/types/job.types";
import { RootStackParamList, ROUTES } from "../../../app/navigation/routes";
import { FlatList } from "react-native";
import { SavedJobCard } from "../components/SavedJobCard";
import { EmptyState } from "../../../shared/components/EmptyState";

type SavedJobsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SavedJobs"
>;

export const SavedJobsScreen: React.FC = () => {
  const navigation = useNavigation<SavedJobsScreenNavigationProp>();
  const { getSavedJobs, removeJob, isJobApplied } = useApp();
  const { tokens } = useTheme();
  const savedJobs = getSavedJobs();

  const handleJobPress = (job: Job) => {
    navigation.navigate(ROUTES.APPLICATION_FORM, { job, fromSavedJobs: true });
  };

  const handleApplyPress = (job: Job) => {
    navigation.navigate(ROUTES.APPLICATION_FORM, { job, fromSavedJobs: true });
  };

  const handleRemovePress = (jobId: string) => {
    removeJob(jobId);
  };

  if (savedJobs.length === 0) {
    return (
      <ScreenContainer noPaddingTop>
        <EmptyState
          title="No Saved Jobs"
          message="Start saving jobs to see them here"
          icon="📋"
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer noPaddingTop>
      <View
        style={[
          styles.infoSection,
          { backgroundColor: tokens.colors.background },
        ]}
      >
        <Text
          style={[
            styles.jobCount,
            {
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.sizes.md,
              fontFamily: tokens.typography.fontFamily.regular,
            },
          ]}
        >
          {savedJobs.length} {savedJobs.length === 1 ? "job" : "jobs"} saved
        </Text>
      </View>
      {/* Job List */}
      <FlatList
        data={savedJobs}
        renderItem={({ item }) => (
          <SavedJobCard
            job={item}
            onPress={() => navigation.navigate(ROUTES.JOB_DETAILS, { job: item })}
            onApplyPress={() => handleApplyPress(item)}
            onRemovePress={() => handleRemovePress(item.id)}
            isApplied={isJobApplied(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingHorizontal: tokens.spacing.lg,
            paddingBottom: tokens.spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  jobCount: {
    lineHeight: 20,
  },
  listContent: {
    paddingTop: 16,
  },
});
