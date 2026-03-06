import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "../../../shared/theme/useTheme";
import { Job } from "../../jobs/types/job.types";
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "react-native-heroicons/outline";

interface JobInfoCardProps {
  job: Job;
}

export const JobInfoCard: React.FC<JobInfoCardProps> = ({ job }) => {
  const { tokens } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: tokens.colors.cardBackground,
          borderRadius: 20,
          padding: 20,
          borderWidth: 1,
          borderColor: tokens.colors.cardStroke,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.logoContainer,
            {
              backgroundColor: tokens.colors.backgroundSecondary,
              borderRadius: 12,
            },
          ]}
        >
          {job.companyLogoUrl ? (
            <Image
              source={{ uri: job.companyLogoUrl }}
              style={[styles.logo, { borderRadius: tokens.borderRadius.md }]}
              resizeMode="contain"
            />
          ) : (
            <Text
              style={[
                styles.logoPlaceholder,
                {
                  color: tokens.colors.textSecondary,
                  fontFamily: tokens.typography.fontFamily.medium,
                },
              ]}
            >
              {job.company.substring(0, 2).toUpperCase()}
            </Text>
          )}
        </View>

        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {
                color: tokens.colors.text,
                fontSize: tokens.typography.sizes.lg,
                fontFamily: tokens.typography.fontFamily.bold,
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
                fontSize: tokens.typography.sizes.md,
                fontFamily: tokens.typography.fontFamily.regular,
                marginTop: 4,
              },
            ]}
          >
            {job.company}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View style={[styles.details, { marginTop: 16 }]}>
        {!!job.location && (
          <View style={styles.detailItem}>
            <MapPinIcon size={16} color={tokens.colors.error} />
            <Text
              style={[
                styles.detailText,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.sm,
                  fontFamily: tokens.typography.fontFamily.regular,
                  marginLeft: 6,
                },
              ]}
            >
              {job.location}
            </Text>
          </View>
        )}

        {!!job.workModel && (
          <View style={styles.detailItem}>
            <BriefcaseIcon size={16} color={tokens.colors.text} />
            <Text
              style={[
                styles.detailText,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.sm,
                  fontFamily: tokens.typography.fontFamily.regular,
                  marginLeft: 6,
                },
              ]}
            >
              {job.workModel}
            </Text>
          </View>
        )}
      </View>

      {/* Salary */}
      {job.salaryRange && job.salaryRange !== "Competitive" && (
        <View style={[styles.salary, { marginTop: 12 }]}>
          <CurrencyDollarIcon size={16} color={tokens.colors.warning} />
          <Text
            style={[
              styles.salaryText,
              {
                color: tokens.colors.textSecondary,
                fontSize: tokens.typography.sizes.sm,
                fontFamily: tokens.typography.fontFamily.regular,
                marginLeft: 6,
              },
            ]}
          >
            {job.salaryRange}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {},
  header: { flexDirection: "row", alignItems: "flex-start" },
  logoContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logo: { width: 60, height: 60 },
  logoPlaceholder: { textAlign: "center", fontSize: 20, fontWeight: "bold" },
  titleContainer: { flex: 1, justifyContent: "center" },
  title: { lineHeight: 24 },
  company: { lineHeight: 20 },
  details: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  detailItem: { flexDirection: "row", alignItems: "center" },
  detailText: { lineHeight: 18 },
  salary: { flexDirection: "row", alignItems: "center" },
  salaryText: { lineHeight: 18 },
});
