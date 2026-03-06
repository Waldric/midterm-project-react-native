import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { ScreenContainer } from "../../../shared/components/ScreenContainer";
import { AppButton } from "../../../shared/components/AppButton";
import { useTheme } from "../../../shared/theme/useTheme";
import { RootStackParamList, ROUTES } from "../../../app/navigation/routes";
import { ApplicationFormData } from "../types/application.types";
import { validateApplicationForm } from "../utils/validation";
import { useApp } from "../../../app/providers/AppProviders";
import { FormField } from "../components/FormField";
import { JobInfoCard } from "../components/JobInfoCard";

type Props = NativeStackScreenProps<RootStackParamList, "ApplicationForm">;

export const ApplicationFormScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { job, fromSavedJobs } = route.params;
  const { tokens } = useTheme();
  const { applyToJob } = useApp();

  const initialValues: ApplicationFormData = {
    name: "",
    email: "",
    contactNumber: "",
    whyHireYou: "",
  };

  const handleSubmit = (values: ApplicationFormData, { resetForm }: any) => {
    Alert.alert(
      "Confirm Application",
      `Are you sure you want to submit your application for ${job.title} at ${job.company}?\n\nPlease review your details:\n\n• Name: ${values.name}\n• Email: ${values.email}\n• Contact: ${values.contactNumber}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Submit",
          style: "default",
          onPress: () => {
            applyToJob(job.id);
            Alert.alert(
              "Application Submitted",
              `Your application for ${job.title} at ${job.company} has been submitted successfully!`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    resetForm();
                    navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: fromSavedJobs
                            ? ROUTES.JOBS_HOME
                            : ROUTES.JOBS_HOME,
                        },
                      ],
                    });
                  },
                },
              ],
              { cancelable: false },
            );
          },
        },
      ],
    );
  };

  return (
    <ScreenContainer noPaddingTop>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ padding: tokens.spacing.lg }}>
            <JobInfoCard job={job} />

            <Text
              style={[
                styles.formTitle,
                {
                  color: tokens.colors.text,
                  fontSize: tokens.typography.sizes.xl,
                  fontFamily: tokens.typography.fontFamily.bold,
                  marginTop: tokens.spacing.xl,
                  marginBottom: tokens.spacing.md,
                },
              ]}
            >
              Application Form
            </Text>

            <Formik
              initialValues={initialValues}
              validate={validateApplicationForm}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <FormField
                    label="Name *"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    placeholder="Enter your full name"
                    error={errors.name}
                    touched={touched.name}
                  />

                  <FormField
                    label="Email *"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email}
                    touched={touched.email}
                  />

                  <FormField
                    label="Contact Number *"
                    value={values.contactNumber}
                    onChangeText={handleChange("contactNumber")}
                    onBlur={handleBlur("contactNumber")}
                    placeholder="Enter your contact number"
                    keyboardType="phone-pad"
                    error={errors.contactNumber}
                    touched={touched.contactNumber}
                  />

                  <FormField
                    label="Why should we hire you? *"
                    value={values.whyHireYou}
                    onChangeText={handleChange("whyHireYou")}
                    onBlur={handleBlur("whyHireYou")}
                    placeholder="Tell us why you're the best fit for this position"
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    error={errors.whyHireYou}
                    touched={touched.whyHireYou}
                  />

                  <View style={{ marginTop: tokens.spacing.md }}>
                    <AppButton
                      title="Submit Application"
                      onPress={handleSubmit}
                      variant="primary"
                      size="large"
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formTitle: {},
});
