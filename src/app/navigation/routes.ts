import { Job } from '../../features/jobs/types/job.types';

export type RootStackParamList = {
  JobsHome: undefined;
  SavedJobs: undefined;
  JobDetails: { job: Job };
  ApplicationForm: { job: Job; fromSavedJobs?: boolean };
};

export const ROUTES = {
  JOBS_HOME: 'JobsHome' as const,
  SAVED_JOBS: 'SavedJobs' as const,
  JOB_DETAILS: 'JobDetails' as const,
  APPLICATION_FORM: 'ApplicationForm' as const,
};
