import uuid from 'react-native-uuid';
import { Job, ApiJob, JobType } from '../types/job.types';

const API_URL = 'https://empllo.com/api/v1';

const mapJobType = (apiType?: string): JobType => {
  if (!apiType) return 'Full-time';
  const normalized = apiType.toLowerCase();
  if (normalized.includes('part')) return 'Part-time';
  if (normalized.includes('contract')) return 'Contract';
  if (normalized.includes('intern')) return 'Internship';
  return 'Full-time';
};

const parseRequirements = (requirements?: string): string[] => {
  if (!requirements) return [];
  return requirements
    .split(/[•\n]/)
    .map(req => req.trim())
    .filter(req => req.length > 0);
};

const transformApiJobToJob = (apiJob: ApiJob): Job => {
  return {
    id: uuid.v4() as string,
    title: apiJob.title || 'Untitled Position',
    company: apiJob.company || 'Unknown Company',
    location: apiJob.location || 'Remote',
    jobType: mapJobType(apiJob.job_type),
    salaryRange: apiJob.salary || 'Competitive',
    description: apiJob.description || 'No description available',
    requirements: parseRequirements(apiJob.requirements),
    tags: apiJob.skills || [],
    postedAt: apiJob.posted_date || new Date().toISOString(),
    companyLogoUrl: undefined,
  };
};

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const jobs = Array.isArray(data) ? data : data.jobs || [];
    
    return jobs.map(transformApiJobToJob);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
