import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../shared/theme/useTheme';
import { Job } from '../../jobs/types/job.types';
import { AppButton } from '../../../shared/components/AppButton';
import { formatDate } from '../../../shared/utils/date';

interface SavedJobCardProps {
  job: Job;
  onPress: () => void;
  onApplyPress: () => void;
  onRemovePress: () => void;
}

export const SavedJobCard: React.FC<SavedJobCardProps> = ({
  job,
  onPress,
  onApplyPress,
  onRemovePress,
}) => {
  const { tokens } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: tokens.colors.cardBackground,
          borderColor: tokens.colors.border,
          borderRadius: tokens.borderRadius.lg,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.logoPlaceholder,
              {
                backgroundColor: tokens.colors.surface,
                borderRadius: tokens.borderRadius.md,
              },
            ]}
          >
            <Text style={styles.logoText}>
              {job.company.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.headerInfo}>
            <Text
              style={[
                styles.title,
                {
                  color: tokens.colors.text,
                  fontSize: tokens.typography.sizes.md,
                  fontWeight: tokens.typography.weights.semibold,
                },
              ]}
              numberOfLines={2}
            >
              {job.title}
            </Text>
            <Text
              style={[
                styles.company,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.sm,
                },
              ]}
            >
              {job.company}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.details, { marginTop: tokens.spacing.sm }]}>
        <View style={styles.detailRow}>
          <Text
            style={[
              styles.detailText,
              {
                color: tokens.colors.textSecondary,
                fontSize: tokens.typography.sizes.sm,
              },
            ]}
          >
            📍 {job.location}
          </Text>
          <Text
            style={[
              styles.detailText,
              {
                color: tokens.colors.textSecondary,
                fontSize: tokens.typography.sizes.sm,
              },
            ]}
          >
            💼 {job.jobType}
          </Text>
        </View>
        <View style={[styles.detailRow, { marginTop: tokens.spacing.xs }]}>
          <Text
            style={[
              styles.detailText,
              {
                color: tokens.colors.primary,
                fontSize: tokens.typography.sizes.sm,
                fontWeight: tokens.typography.weights.semibold,
              },
            ]}
          >
            💰 {job.salaryRange}
          </Text>
          <Text
            style={[
              styles.detailText,
              {
                color: tokens.colors.textSecondary,
                fontSize: tokens.typography.sizes.xs,
              },
            ]}
          >
            {formatDate(job.postedAt)}
          </Text>
        </View>
      </View>

      <View style={[styles.actions, { marginTop: tokens.spacing.md }]}>
        <AppButton
          title="Remove"
          onPress={onRemovePress}
          variant="outline"
          size="small"
          style={styles.actionButton}
        />
        <AppButton
          title="Apply"
          onPress={onApplyPress}
          variant="primary"
          size="small"
          style={styles.actionButton}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2563EB',
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  company: {
    marginBottom: 2,
  },
  details: {},
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {},
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
});
