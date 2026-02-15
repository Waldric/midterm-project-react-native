export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: JobType;
  salaryRange: string;
  description: string;
  requirements: string[];
  tags: string[];
  postedAt: string;
  companyLogoUrl?: string;
}

export interface ApiJob {
  title?: string;
  company?: string;
  location?: string;
  job_type?: string;
  salary?: string;
  description?: string;
  requirements?: string;
  skills?: string[];
  posted_date?: string;
}
