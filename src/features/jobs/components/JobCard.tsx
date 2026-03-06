import React from "react";
import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";
import { Job } from "../types/job.types";
import { useTheme } from "../../../shared/theme/useTheme";
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "react-native-heroicons/outline";

interface JobCardProps {
  job: Job;
  onPress: () => void;
  onSavePress: () => void;
  onApplyPress: () => void;
  isSaved: boolean;
  isApplied: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onPress,
  onSavePress,
  onApplyPress,
  isSaved,
  isApplied,
}) => {
  const { tokens } = useTheme();

  const handleSavePress = () => {
    if (isSaved) {
      Alert.alert("Remove Saved Job", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: onSavePress },
      ]);
    } else {
      onSavePress();
      Alert.alert("Success", "Added to your saved jobs");
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: tokens.colors.cardBackground,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: tokens.colors.cardStroke,
        },
      ]}
    >
      {/* SECTION 1: Top area handles the navigation to details */}
      <Pressable 
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      >
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
              numberOfLines={1}
            >
              {job.company}
            </Text>
          </View>
        </View>

        <View style={[styles.infoRow, { marginTop: 16 }]}>
          {job.location && (
            <View style={styles.infoItem}>
              <MapPinIcon size={18} color={tokens.colors.error} />
              <Text
                style={[
                  styles.infoText,
                  {
                    color: tokens.colors.textSecondary,
                    fontSize: tokens.typography.sizes.md,
                  },
                ]}
                numberOfLines={1}
              >
                {job.location}
              </Text>
            </View>
          )}

          {job.workModel && (
            <View style={styles.infoItem}>
              <BriefcaseIcon size={18} color={tokens.colors.text} />
              <Text
                style={[
                  styles.infoText,
                  {
                    color: tokens.colors.textSecondary,
                    fontSize: tokens.typography.sizes.md,
                  },
                ]}
              >
                {job.workModel}
              </Text>
            </View>
          )}
        </View>

        {job.salaryRange && job.salaryRange !== "Competitive" && (
          <View style={[styles.salaryRow, { marginTop: 12 }]}>
            <CurrencyDollarIcon size={18} color={tokens.colors.warning} />
            <Text
              style={[
                styles.salaryText,
                {
                  color: tokens.colors.textSecondary,
                  fontSize: tokens.typography.sizes.md,
                },
              ]}
            >
              {job.salaryRange}
            </Text>
          </View>
        )}

        <View style={[styles.tagsRow, { marginTop: 16 }]}>
          {[job.seniorityLevel, job.jobType, job.mainCategory].map((tag, index) => (
            tag && (
              <View
                key={index}
                style={[
                  styles.tag,
                  {
                    backgroundColor: tokens.colors.tagBackground,
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
            )
          ))}
        </View>
      </Pressable>

      {/* SECTION 2: Separate View for buttons so they don't trigger the card's onPress */}
      <View style={[styles.actionsRow, { marginTop: 20 }]}>
        <Pressable
          onPress={handleSavePress}
          style={[
            styles.saveButton,
            {
              borderWidth: 2,
              borderColor: isSaved ? tokens.colors.savedJob : tokens.colors.primary,
              borderRadius: 10,
              backgroundColor: isSaved ? tokens.colors.savedJob : tokens.colors.cardBackground,
            },
          ]}
        >
          <Text
            style={[
              styles.saveButtonText,
              {
                color: isSaved ? tokens.colors.buttonText : tokens.colors.primary,
                fontFamily: tokens.typography.fontFamily.semibold,
              },
            ]}
          >
            {isSaved ? "Saved" : "Save Job"}
          </Text>
        </Pressable>

        <Pressable
          onPress={onApplyPress}
          disabled={isApplied}
          style={[
            styles.applyButton,
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
              styles.applyButtonText,
              {
                color: isApplied
                  ? tokens.colors.textSecondary
                  : tokens.colors.buttonText,
                fontFamily: tokens.typography.fontFamily.semibold,
              },
            ]}
          >
            {isApplied ? "Applied" : "Apply"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    width: 60,
    height: 60,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  logoPlaceholder: {
    textAlign: "center",
    fontSize: 11,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    lineHeight: 26,
  },
  company: {
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    lineHeight: 20,
  },
  salaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  salaryText: {
    lineHeight: 20,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {},
  tagText: {
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {},
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {},
});