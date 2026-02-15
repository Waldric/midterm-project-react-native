import { ApplicationFormData, ApplicationFormErrors } from '../types/application.types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateContactNumber = (contactNumber: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const digitsOnly = contactNumber.replace(/\D/g, '');
  return phoneRegex.test(contactNumber) && digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

export const validateApplicationForm = (
  formData: ApplicationFormData
): ApplicationFormErrors => {
  const errors: ApplicationFormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!validateContactNumber(formData.contactNumber)) {
    errors.contactNumber = 'Please enter a valid contact number (10-15 digits)';
  }

  if (!formData.whyHireYou.trim()) {
    errors.whyHireYou = 'This field is required';
  } else if (formData.whyHireYou.trim().length < 20) {
    errors.whyHireYou = 'Please provide at least 20 characters';
  }

  return errors;
};

export const hasErrors = (errors: ApplicationFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
