import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';
import { AppButton } from '../../../shared/components/AppButton';
import { useApp } from '../../../app/providers/AppProviders';
import { useTheme } from '../../../shared/theme/useTheme';
import { RootStackParamList, ROUTES } from '../../../app/navigation/routes';
import { formatDate } from '../../../shared/utils/date';

type JobDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'JobDetails'>;

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ route, navigation }) => {
  const { job } = route.params;
  const { saveJob, isJobSaved } = useApp();
  const { tokens } = useTheme();
  const isSaved = isJobSaved(job.id);

  const handleSavePress = () => {
    if (!isSaved) {
      saveJob(job.id);
    }
  };

  const handleApplyPress = () => {
    navigation.navigate(ROUTES.APPLICATION_FORM, { job, fromSavedJobs: false });
  };

  return (
    <ScreenContainer>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { padding: tokens.spacing.lg }]}>
          <View
            style={[
              styles.header,
              {
                backgroundColor: tokens.colors.cardBackground,
                borderRadius: tokens.borderRadius.lg,
                padding: tokens.spacing.lg,
                borderWidth: 1,
                borderColor: tokens.colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.logo,
                {
                  backgroundColor: tokens.colors.surface,
                  borderRadius: tokens.borderRadius.md,
                },
              ]}
            >
              <Text style={styles.logoText}>{job.company.charAt(0).toUpperCase()}</Text>
            </View>
            <Text
              style={[
                styles.title,
                {
                  color: tokens.colors.text,
                  fontSize: tokens.typography.sizes.xl,
                  fontWeight: tokens.typography.weights.bold,
                  marginTop: tokens.spacing.md,
                },
              ]}
            >
              {job.title}
            </Text>
            <Text
              style={[
                styles.company,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.lg,
                  marginTop: tokens.spacing.xs,
                },
              ]}
            >
              {job.company}
            </Text>
            <View style={[styles.metadata, { marginTop: tokens.spacing.md }]}>
              <Text
                style={[
                  styles.metadataText,
                  { color: tokens.colors.textSecondary, fontSize: tokens.typography.sizes.sm },
                ]}
              >
                📍 {job.location}
              </Text>
              <Text
                style={[
                  styles.metadataText,
                  { color: tokens.colors.textSecondary, fontSize: tokens.typography.sizes.sm },
                ]}
              >
                💼 {job.jobType}
              </Text>
            </View>
            <Text
              style={[
                styles.salary,
                {
                  color: tokens.colors.primary,
                  fontSize: tokens.typography.sizes.lg,
                  fontWeight: tokens.typography.weights.semibold,
                  marginTop: tokens.spacing.sm,
                },
              ]}
            >
              💰 {job.salaryRange}
            </Text>
            <Text
              style={[
                styles.posted,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.xs,
                  marginTop: tokens.spacing.xs,
                },
              ]}
            >
              Posted {formatDate(job.postedAt)}
            </Text>
          </View>

          <View style={[styles.section, { marginTop: tokens.spacing.lg }]}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: tokens.colors.text,
                  fontSize: tokens.typography.sizes.lg,
                  fontWeight: tokens.typography.weights.semibold,
                },
              ]}
            >
              Job Description
            </Text>
            <Text
              style={[
                styles.sectionContent,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.md,
                  marginTop: tokens.spacing.sm,
                  lineHeight: 24,
                },
              ]}
            >
              {job.description}
            </Text>
          </View>

          {job.requirements.length > 0 && (
            <View style={[styles.section, { marginTop: tokens.spacing.lg }]}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.lg,
                    fontWeight: tokens.typography.weights.semibold,
                  },
                ]}
              >
                Requirements
              </Text>
              <View style={{ marginTop: tokens.spacing.sm }}>
                {job.requirements.map((req, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.requirement,
                      {
                        color: tokens.colors.textSecondary,
                        fontSize: tokens.typography.sizes.md,
                        marginBottom: tokens.spacing.xs,
                      },
                    ]}
                  >
                    • {req}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {job.tags.length > 0 && (
            <View style={[styles.section, { marginTop: tokens.spacing.lg }]}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.lg,
                    fontWeight: tokens.typography.weights.semibold,
                  },
                ]}
              >
                Skills
              </Text>
              <View style={[styles.tags, { marginTop: tokens.spacing.sm }]}>
                {job.tags.map((tag, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tag,
                      {
                        backgroundColor: tokens.colors.surface,
                        borderRadius: tokens.borderRadius.sm,
                        paddingHorizontal: tokens.spacing.sm,
                        paddingVertical: tokens.spacing.xs,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        {
                          color: tokens.colors.text,
                          fontSize: tokens.typography.sizes.sm,
                        },
                      ]}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={[styles.actions, { marginTop: tokens.spacing.xl, marginBottom: tokens.spacing.lg }]}>
            <AppButton
              title={isSaved ? 'Saved' : 'Save Job'}
              onPress={handleSavePress}
              variant={isSaved ? 'secondary' : 'outline'}
              style={styles.actionButton}
              disabled={isSaved}
            />
            <AppButton
              title="Apply Now"
              onPress={handleApplyPress}
              variant="primary"
              style={styles.actionButton}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {},
  header: {},
  logo: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2563EB',
  },
  title: {},
  company: {},
  metadata: {
    flexDirection: 'row',
    gap: 16,
  },
  metadataText: {},
  salary: {},
  posted: {},
  section: {},
  sectionTitle: {},
  sectionContent: {},
  requirement: {},
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {},
  tagText: {},
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
