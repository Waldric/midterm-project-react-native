import { Job } from '../types/job.types';

export const filterJobsBySearch = (jobs: Job[], searchQuery: string): Job[] => {
  if (!searchQuery.trim()) {
    return jobs;
  }

  const query = searchQuery.toLowerCase().trim();
  
  return jobs.filter(job => 
    job.title.toLowerCase().includes(query)
  );
};

export const isDuplicateJob = (savedJobIds: string[], jobId: string): boolean => {
  return savedJobIds.includes(jobId);
};
