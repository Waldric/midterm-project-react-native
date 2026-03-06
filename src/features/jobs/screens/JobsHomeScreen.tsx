import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text, Switch } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ScreenContainer } from "../../../shared/components/ScreenContainer";
import { SearchBar } from "../components/SearchBar";
import { JobList } from "../components/JobList";
import { useApp } from "../../../app/providers/AppProviders";
import { useTheme } from "../../../shared/theme/useTheme";
import { filterJobsBySearch } from "../utils/jobs.filters";
import { Job } from "../types/job.types";
import { RootStackParamList, ROUTES } from "../../../app/navigation/routes";

type JobsHomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "JobsHome"
>;

export const JobsHomeScreen: React.FC = () => {
  const navigation = useNavigation<JobsHomeScreenNavigationProp>();

  const {
    jobs,
    savedJobIds,
    isLoading,
    fetchJobsData,
    saveJob,
    removeJob,
    isJobSaved,
    appliedJobIds,
    toggleTheme,
    theme,
  } = useApp();

  const { tokens } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchJobsData();
  }, []);

  const filteredJobs = filterJobsBySearch(jobs, searchQuery);

  const handleJobPress = (job: Job) => {
    navigation.navigate(ROUTES.JOB_DETAILS, { job });
  };

  const handleSavePress = (jobId: string) => {
    if (isJobSaved(jobId)) {
      removeJob(jobId);
    } else {
      saveJob(jobId);
    }
  };

  const handleApplyPress = (job: Job) => {
    navigation.navigate(ROUTES.APPLICATION_FORM, { job, fromSavedJobs: false });
  };

  const isJobApplied = (jobId: string): boolean => {
    return appliedJobIds?.includes(jobId) ?? false;
  };

  const handleSavedJobsPress = () => {
    navigation.navigate(ROUTES.SAVED_JOBS);
  };

  return (
    <ScreenContainer keyboardAware>
      <View
        style={[styles.header, { backgroundColor: tokens.colors.background }]}
      >
        {/* Header Top with Title and Theme Toggle */}
        <View style={styles.headerTop}>
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.headerSubtitle,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.md,
                  fontFamily: tokens.typography.fontFamily.regular,
                },
              ]}
            >
              Find a job with
            </Text>
            <Text
              style={[
                styles.headerTitle,
                {
                  color: tokens.colors.text,
                  fontSize: 48,
                  fontFamily: tokens.typography.fontFamily.bold,
                  marginTop: 1,
                },
              ]}
            >
              JobNode.
            </Text>
          </View>

          {/* Theme Toggle */}
          <View style={styles.themeToggleContainer}>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{
                false: tokens.colors.border,
                true: tokens.colors.primary,
              }}
              thumbColor={tokens.colors.surface}
              ios_backgroundColor={tokens.colors.border}
            />
            <Text
              style={[
                styles.themeLabel,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.sm,
                  fontFamily: tokens.typography.fontFamily.regular,
                  marginTop: 4,
                },
              ]}
            >
              {theme === "light" ? "Light Mode" : "Dark Mode"}
            </Text>
          </View>
        </View>

        {/* Search Bar and Saved Jobs Button */}
        <View style={[styles.searchRow, { marginTop: tokens.spacing.lg }]}>
          <View style={styles.searchBarContainer}>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          </View>

          <Pressable
            onPress={handleSavedJobsPress}
            style={[
              styles.savedButton,
              {
                backgroundColor: tokens.colors.primary,
                borderRadius: 10,
              },
            ]}
          >
            <Text
              style={[
                styles.savedButtonText,
                {
                  color: tokens.colors.background,
                  fontSize: tokens.typography.sizes.md,
                  fontFamily: tokens.typography.fontFamily.semibold,
                },
              ]}
            >
              Saved Jobs
            </Text>
            {savedJobIds.length > 0 && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: tokens.colors.error,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontFamily: tokens.typography.fontFamily.bold,
                    },
                  ]}
                >
                  {savedJobIds.length}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Job Count */}
        {!isLoading && filteredJobs.length > 0 && (
          <View
            style={[styles.jobCountContainer, { marginTop: tokens.spacing.md }]}
          >
            <Text
              style={[
                styles.jobCount,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.sm,
                  fontFamily: tokens.typography.fontFamily.regular,
                },
              ]}
            >
              {searchQuery
                ? `Found ${filteredJobs.length} ${filteredJobs.length === 1 ? "job" : "jobs"} matching "${searchQuery}"`
                : `${filteredJobs.length} ${filteredJobs.length === 1 ? "job" : "jobs"} available`}
            </Text>
          </View>
        )}
      </View>

      <JobList
        jobs={filteredJobs}
        savedJobIds={savedJobIds}
        onJobPress={handleJobPress}
        onSavePress={handleSavePress}
        onApplyPress={handleApplyPress}
        isJobApplied={isJobApplied}
        isLoading={isLoading}
        emptyTitle={searchQuery ? "No Jobs Found" : "No Jobs Available"}
        emptyMessage={
          searchQuery
            ? "Try searching with different keywords"
            : "Check back later for new opportunities"
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
  },
  headerSubtitle: {
    lineHeight: 22,
  },
  headerTitle: {
    lineHeight: 56,
    letterSpacing: -1,
  },
  themeToggleContainer: {
    alignItems: "center",
    paddingTop: 8,
  },
  themeLabel: {
    textAlign: "center",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBarContainer: {
    flex: 1,
    marginRight: 12,
  },
  savedButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  savedButtonText: {
    lineHeight: 20,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    lineHeight: 16,
  },
  jobCountContainer: {
    paddingHorizontal: 4,
  },
  jobCount: {
    lineHeight: 18,
  },
});
