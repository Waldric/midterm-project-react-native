export interface ApplicationFormData {
  name: string;
  email: string;
  contactNumber: string;
  whyHireYou: string;
}

export interface ApplicationFormErrors {
  name?: string;
  email?: string;
  contactNumber?: string;
  whyHireYou?: string;
}
