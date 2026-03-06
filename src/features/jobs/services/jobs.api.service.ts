import uuid from "react-native-uuid";
import { Job, EmplloJob, EmplloApiResponse, JobType } from "../types/job.types";

const API_URL = "https://empllo.com/api/v1";

const mapJobType = (apiType?: string): JobType => {
  if (!apiType) return "Full-time";
  const normalized = apiType.toLowerCase();
  if (normalized.includes("part")) return "Part-time";
  if (normalized.includes("contract")) return "Contract";
  if (normalized.includes("intern")) return "Internship";
  return "Full-time";
};

const formatSalary = (
  minSalary: number | null,
  maxSalary: number | null,
  currency: string,
): string => {
  if (!minSalary && !maxSalary) return "Competitive";

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  });

  if (minSalary && maxSalary) {
    return `${formatter.format(minSalary)} - ${formatter.format(maxSalary)}`;
  } else if (minSalary) {
    return `From ${formatter.format(minSalary)}`;
  } else if (maxSalary) {
    return `Up to ${formatter.format(maxSalary)}`;
  }

  return "Competitive";
};

const parseRequirementsFromDescription = (description: string): string[] => {
  const requirementsMatch = description.match(
    /<h3>🎯 Requirements<\/h3>(.*?)(?=<h3>|$)/s,
  );

  if (!requirementsMatch) return [];

  const requirementsHtml = requirementsMatch[1];
  const items = requirementsHtml.match(/<li>(.*?)<\/li>/g);

  if (!items) return [];

  return items
    .map((item) => item.replace(/<\/?li>/g, "").trim())
    .filter((item) => item.length > 0);
};

const transformEmplloJobToJob = (emploJob: EmplloJob): Job => {
  const location =
    emploJob.locations && emploJob.locations.length > 0
      ? emploJob.locations.join(", ")
      : "Remote";

  const salaryRange = formatSalary(
    emploJob.minSalary,
    emploJob.maxSalary,
    emploJob.currency,
  );

  const requirements = parseRequirementsFromDescription(emploJob.description);

  return {
    id: emploJob.guid,
    title: emploJob.title,
    company: emploJob.companyName,
    location: location,
    jobType: mapJobType(emploJob.jobType),
    salaryRange: salaryRange,
    description: emploJob.description,
    requirements: requirements,
    benefits: parseBenefitsFromDescription(emploJob.description),
    tags: emploJob.tags || [],
    postedAt: new Date(emploJob.pubDate * 1000).toISOString(),
    companyLogoUrl: emploJob.companyLogo || undefined,
    workModel: emploJob.workModel,
    seniorityLevel: emploJob.seniorityLevel,
    mainCategory: emploJob.mainCategory,
    applicationLink: emploJob.applicationLink,
  };
};

const parseBenefitsFromDescription = (description: string): string[] => {
  const benefitsMatch = description.match(/<h3>💰 Benefits<\/h3>(.*?)(?=<h3>|$)/s);
  if (!benefitsMatch) return [];

  const items = benefitsMatch[1].match(/<li>(.*?)<\/li>/g);
  return items ? items.map(i => i.replace(/<\/?li>/g, "").trim()) : [];
};

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    console.log("📡 Fetching jobs from Empllo API...");

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: EmplloApiResponse = await response.json();

    console.log("✅ Received", data.jobs.length, "jobs from API");

    const transformedJobs = data.jobs.map(transformEmplloJobToJob);

    console.log("✅ Transformed jobs:", transformedJobs.length);

    return transformedJobs;
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    throw error;
  }
};
