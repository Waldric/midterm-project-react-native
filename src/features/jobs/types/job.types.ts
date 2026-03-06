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
  benefits: string[]; // 👈 Added this
  tags: string[];
  postedAt: string;
  companyLogoUrl?: string;
  workModel?: string;
  seniorityLevel?: string;
  mainCategory?: string;
  applicationLink?: string;
}

export interface EmplloJob {
  title: string;
  mainCategory: string;
  companyName: string;
  companyLogo: string | null;
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  minSalary: number | null;
  maxSalary: number | null;
  currency: string;
  locations: string[];
  tags: string[];
  description: string;
  pubDate: number;
  expiryDate: number;
  applicationLink: string;
  guid: string;
}

export interface EmplloApiResponse {
  usage: string;
  updated_at: number;
  offset: number;
  limit: number;
  total_count: number;
  jobs: EmplloJob[];
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