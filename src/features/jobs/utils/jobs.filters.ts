import { Job } from "../types/job.types";

export const filterJobsBySearch = (jobs: Job[], searchQuery: string): Job[] => {
  if (!searchQuery.trim()) {
    return jobs;
  }

  const query = searchQuery.toLowerCase().trim();

  return jobs.filter((job) => {
    // title
    const titleMatch = job.title.toLowerCase().includes(query);

    // company name
    const companyMatch = job.company.toLowerCase().includes(query);

    // location
    const locationMatch = job.location.toLowerCase().includes(query);

    // work model (e.g., "Remote", "Hybrid", "On site")
    const workModelMatch =
      job.workModel?.toLowerCase().includes(query) || false;

    // job type (e.g., "Full-time", "Part-time")
    const jobTypeMatch = job.jobType.toLowerCase().includes(query);

    // seniority level
    const seniorityMatch =
      job.seniorityLevel?.toLowerCase().includes(query) || false;

    // main category
    const categoryMatch =
      job.mainCategory?.toLowerCase().includes(query) || false;

    // tags
    const tagsMatch = job.tags.some((tag) => tag.toLowerCase().includes(query));

    return (
      titleMatch ||
      companyMatch ||
      locationMatch ||
      workModelMatch ||
      jobTypeMatch ||
      seniorityMatch ||
      categoryMatch ||
      tagsMatch
    );
  });
};
