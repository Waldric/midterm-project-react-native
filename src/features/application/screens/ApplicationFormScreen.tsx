import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';
import { AppButton } from '../../../shared/components/AppButton';
import { useTheme } from '../../../shared/theme/useTheme';
import { RootStackParamList, ROUTES } from '../../../app/navigation/routes';
import { ApplicationFormData, ApplicationFormErrors } from '../types/application.types';
import { validateApplicationForm, hasErrors } from '../utils/validation';

type ApplicationFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ApplicationForm'>;

export const ApplicationFormScreen: React.FC<ApplicationFormScreenProps> = ({ route, navigation }) => {
  const { job, fromSavedJobs } = route.params;
  const { tokens } = useTheme();
  
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    contactNumber: '',
    whyHireYou: '',
  });

  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [touched, setTouched] = useState<Record<keyof ApplicationFormData, boolean>>({
    name: false,
    email: false,
    contactNumber: false,
    whyHireYou: false,
  });

  const handleInputChange = (field: keyof ApplicationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validateApplicationForm({ ...formData, [field]: value });
      setErrors(newErrors);
    }
  };

  const handleBlur = (field: keyof ApplicationFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const newErrors = validateApplicationForm(formData);
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    const allTouched: Record<keyof ApplicationFormData, boolean> = {
      name: true,
      email: true,
      contactNumber: true,
      whyHireYou: true,
    };
    setTouched(allTouched);

    const validationErrors = validateApplicationForm(formData);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      Alert.alert(
        'Validation Error',
        'Please fix all errors before submitting',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Application Submitted',
      `Your application for ${job.title} at ${job.company} has been submitted successfully!`,
      [
        {
          text: 'Okay',
          onPress: () => {
            setFormData({
              name: '',
              email: '',
              contactNumber: '',
              whyHireYou: '',
            });
            setTouched({
              name: false,
              email: false,
              contactNumber: false,
              whyHireYou: false,
            });
            setErrors({});

            if (fromSavedJobs) {
              navigation.reset({
                index: 0,
                routes: [{ name: ROUTES.JOBS_HOME }],
              });
            } else {
              navigation.goBack();
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.container, { padding: tokens.spacing.lg }]}>
            <View
              style={[
                styles.jobInfo,
                {
                  backgroundColor: tokens.colors.cardBackground,
                  borderRadius: tokens.borderRadius.lg,
                  padding: tokens.spacing.md,
                  borderWidth: 1,
                  borderColor: tokens.colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.jobTitle,
                  {
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.lg,
                    fontWeight: tokens.typography.weights.semibold,
                  },
                ]}
              >
                {job.title}
              </Text>
              <Text
                style={[
                  styles.jobCompany,
                  {
                    color: tokens.colors.textSecondary,
                    fontSize: tokens.typography.sizes.md,
                    marginTop: tokens.spacing.xs,
                  },
                ]}
              >
                {job.company}
              </Text>
            </View>

            <Text
              style={[
                styles.formTitle,
                {
                  color: tokens.colors.text,
                  fontSize: tokens.typography.sizes.xl,
                  fontWeight: tokens.typography.weights.bold,
                  marginTop: tokens.spacing.xl,
                  marginBottom: tokens.spacing.md,
                },
              ]}
            >
              Application Form
            </Text>

            <View style={[styles.field, { marginBottom: tokens.spacing.md }]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.md,
                    fontWeight: tokens.typography.weights.medium,
                    marginBottom: tokens.spacing.xs,
                  },
                ]}
              >
                Name *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: tokens.colors.inputBackground,
                    borderColor: errors.name && touched.name ? tokens.colors.error : tokens.colors.border,
                    borderRadius: tokens.borderRadius.md,
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.md,
                  },
                ]}
                value={formData.name}
                onChangeText={value => handleInputChange('name', value)}
                onBlur={() => handleBlur('name')}
                placeholder="Enter your full name"
                placeholderTextColor={tokens.colors.textSecondary}
              />
              {errors.name && touched.name && (
                <Text
                  style={[
                    styles.errorText,
                    {
                      color: tokens.colors.error,
                      fontSize: tokens.typography.sizes.sm,
                      marginTop: tokens.spacing.xs,
                    },
                  ]}
                >
                  {errors.name}
                </Text>
              )}
            </View>

            <View style={[styles.field, { marginBottom: tokens.spacing.md }]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.md,
                    fontWeight: tokens.typography.weights.medium,
                    marginBottom: tokens.spacing.xs,
                  },
                ]}
              >
                Email *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: tokens.colors.inputBackground,
                    borderColor: errors.email && touched.email ? tokens.colors.error : tokens.colors.border,
                    borderRadius: tokens.borderRadius.md,
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.md,
                  },
                ]}
                value={formData.email}
                onChangeText={value => handleInputChange('email', value)}
                onBlur={() => handleBlur('email')}
                placeholder="Enter your email"
                placeholderTextColor={tokens.colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && touched.email && (
                <Text
                  style={[
                    styles.errorText,
                    {
                      color: tokens.colors.error,
                      fontSize: tokens.typography.sizes.sm,
                      marginTop: tokens.spacing.xs,
                    },
                  ]}
                >
                  {errors.email}
                </Text>
              )}
            </View>

            <View style={[styles.field, { marginBottom: tokens.spacing.md }]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.md,
                    fontWeight: tokens.typography.weights.medium,
                    marginBottom: tokens.spacing.xs,
                  },
                ]}
              >
                Contact Number *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: tokens.colors.inputBackground,
                    borderColor: errors.contactNumber && touched.contactNumber ? tokens.colors.error : tokens.colors.border,
                    borderRadius: tokens.borderRadius.md,
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.md,
                  },
                ]}
                value={formData.contactNumber}
                onChangeText={value => handleInputChange('contactNumber', value)}
                onBlur={() => handleBlur('contactNumber')}
                placeholder="Enter your contact number"
                placeholderTextColor={tokens.colors.textSecondary}
                keyboardType="phone-pad"
              />
              {errors.contactNumber && touched.contactNumber && (
                <Text
                  style={[
                    styles.errorText,
                    {
                      color: tokens.colors.error,
                      fontSize: tokens.typography.sizes.sm,
                      marginTop: tokens.spacing.xs,
                    },
                  ]}
                >
                  {errors.contactNumber}
                </Text>
              )}
            </View>

            <View style={[styles.field, { marginBottom: tokens.spacing.xl }]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.md,
                    fontWeight: tokens.typography.weights.medium,
                    marginBottom: tokens.spacing.xs,
                  },
                ]}
              >
                Why should we hire you? *
              </Text>
              <TextInput
                style={[
                  styles.textArea,
                  {
                    backgroundColor: tokens.colors.inputBackground,
                    borderColor: errors.whyHireYou && touched.whyHireYou ? tokens.colors.error : tokens.colors.border,
                    borderRadius: tokens.borderRadius.md,
                    color: tokens.colors.text,
                    fontSize: tokens.typography.sizes.md,
                  },
                ]}
                value={formData.whyHireYou}
                onChangeText={value => handleInputChange('whyHireYou', value)}
                onBlur={() => handleBlur('whyHireYou')}
                placeholder="Tell us why you're the best fit for this position (minimum 20 characters)"
                placeholderTextColor={tokens.colors.textSecondary}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
              {errors.whyHireYou && touched.whyHireYou && (
                <Text
                  style={[
                    styles.errorText,
                    {
                      color: tokens.colors.error,
                      fontSize: tokens.typography.sizes.sm,
                      marginTop: tokens.spacing.xs,
                    },
                  ]}
                >
                  {errors.whyHireYou}
                </Text>
              )}
            </View>

            <AppButton
              title="Submit Application"
              onPress={handleSubmit}
              variant="primary"
              size="large"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {},
  jobInfo: {},
  jobTitle: {},
  jobCompany: {},
  formTitle: {},
  field: {},
  label: {},
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textArea: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 120,
  },
  errorText: {},
});
