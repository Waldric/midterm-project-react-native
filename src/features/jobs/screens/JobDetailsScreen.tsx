import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenContainer } from "../../../shared/components/ScreenContainer";
import { useApp } from "../../../app/providers/AppProviders";
import { useTheme } from "../../../shared/theme/useTheme";
import { RootStackParamList, ROUTES } from "../../../app/navigation/routes";
import { JobInfoCard } from "../../application/components/JobInfoCard";

type JobDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "JobDetails"
>;

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const { tokens } = useTheme();
  return (
    <View style={[styles.section, { marginTop: tokens.spacing.lg }]}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: tokens.colors.text,
            fontSize: tokens.typography.sizes.lg,
            fontFamily: tokens.typography.fontFamily.bold,
          },
        ]}
      >
        {title}
      </Text>
      <View style={{ marginTop: tokens.spacing.sm }}>{children}</View>
    </View>
  );
};

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { job } = route.params;
  const { saveJob, removeJob, isJobSaved, isJobApplied } = useApp();
  const { tokens } = useTheme();
  const isSaved = isJobSaved(job.id);
  const isApplied = isJobApplied(job.id);

  const handleSavePress = () => {
    if (isSaved) {
      Alert.alert(
        "Remove Saved Job",
        "Are you sure you want to remove this job from your saved jobs?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => removeJob(job.id),
          },
        ],
      );
    } else {
      saveJob(job.id);
      Alert.alert("Success", "Added to your saved jobs");
    }
  };

  const handleApplyPress = () => {
    navigation.navigate(ROUTES.APPLICATION_FORM, { job, fromSavedJobs: false });
  };
const extractDescription = (html: string): string => {
  return html
    .replace(/<h3>🎯 Requirements<\/h3>.*?(?=<h3>|$)/s, "")
    .replace(/<h3>💰 Benefits<\/h3>.*?(?=<h3>|$)/s, "")
    .replace(/<p>/g, "\n")
    .replace(/<\/p>/g, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\n\s*\n/g, "\n\n")
    .trim();
};

const cleanDescription = extractDescription(job.description);
  return (
    <ScreenContainer noPaddingTop>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: tokens.spacing.lg,
          paddingBottom: 120,
        }}
      >
        <View style={styles.container}>
          <JobInfoCard job={job} />

          {/* Job Description */}
          <Section title="Job Description">
            <Text
              style={[
                styles.text,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.md,
                  fontFamily: tokens.typography.fontFamily.regular,
                  lineHeight: 24,
                },
              ]}
            >
              {cleanDescription}
            </Text>
          </Section>

          {/* Requirements */}
          {!!job.requirements && job.requirements.length > 0 && (
            <Section title="Requirements">
              {job.requirements.map((req, index) => (
                <Text
                  key={index}
                  style={[
                    styles.listItem,
                    {
                      color: tokens.colors.textSecondary,
                      fontSize: tokens.typography.sizes.md,
                      fontFamily: tokens.typography.fontFamily.regular,
                      marginBottom: tokens.spacing.xs,
                      lineHeight: 22,
                    },
                  ]}
                >
                  • {req}
                </Text>
              ))}
            </Section>
          )}

          {/* Benefits */}
        {!!job.benefits.length && (
  <Section title="Benefits">
    {job.benefits.map((benefit, index) => (
      <Text
        key={index}
        style={[
          styles.listItem,
          {
            color: tokens.colors.textSecondary,
            fontSize: tokens.typography.sizes.md,
            fontFamily: tokens.typography.fontFamily.regular,
            marginBottom: tokens.spacing.xs,
            lineHeight: 22,
          },
        ]}
      >
        • {benefit}
      </Text>
    ))}
  </Section>
)}

          {/* Required Skills */}
          {!!job.tags && job.tags.length > 0 && (
            <Section title="Required Skills">
              <View style={styles.tagsContainer}>
                {job.tags.map((tag, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tag,
                      {
                        backgroundColor: tokens.colors.backgroundSecondary,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        {
                          color: tokens.colors.text,
                          fontSize: tokens.typography.sizes.sm,
                          fontFamily: tokens.typography.fontFamily.medium,
                        },
                      ]}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </Section>
          )}
        </View>
      </ScrollView>

      {/* Fixed Action Buttons */}
      <View
        style={[
          styles.actions,
          {
            backgroundColor: tokens.colors.background,
            borderTopWidth: 1,
            borderTopColor: tokens.colors.border,
            padding: tokens.spacing.lg,
          },
        ]}
      >
        <Pressable
          onPress={handleSavePress}
          style={[
            styles.button,
            {
              borderWidth: 2,
              borderColor: isSaved
                ? tokens.colors.savedJob
                : tokens.colors.primary,
              borderRadius: 10,
              backgroundColor: isSaved
                ? tokens.colors.savedJob
                : tokens.colors.cardBackground,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: isSaved
                  ? tokens.colors.buttonText
                  : tokens.colors.primary,
                fontSize: tokens.typography.sizes.md,
                fontFamily: tokens.typography.fontFamily.semibold,
              },
            ]}
          >
            {isSaved ? "Saved" : "Save Job"}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleApplyPress}
          disabled={isApplied}
          style={[
            styles.button,
            {
              backgroundColor: isApplied
                ? tokens.colors.backgroundSecondary
                : tokens.colors.primary,
              borderRadius: 10,
              opacity: isApplied ? 0.8 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: isApplied
                  ? tokens.colors.textSecondary
                  : tokens.colors.buttonText,
                fontSize: tokens.typography.sizes.md,
                fontFamily: tokens.typography.fontFamily.semibold,
              },
            ]}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  container: {
    flex: 1,
  },
  section: {},
  sectionTitle: { lineHeight: 24 },
  text: {},
  listItem: {},
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {},
  tagText: { lineHeight: 18 },
  actions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { lineHeight: 20 },
});
