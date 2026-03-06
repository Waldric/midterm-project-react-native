import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { Job } from "../../features/jobs/types/job.types";
import { loadSavedJobs, saveSavedJobs } from "../../shared/utils/storage";
import { fetchJobs } from "../../features/jobs/services/jobs.api.service";
import { useTheme } from "../../shared/theme/ThemeProvider";
import { ThemeMode } from "../../shared/theme/theme.types";

interface AppState {
  jobs: Job[];
  savedJobIds: string[];
  appliedJobIds: string[]; // ✅ Added tracked applied jobs
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: "SET_JOBS"; payload: Job[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SAVE_JOB"; payload: string }
  | { type: "REMOVE_JOB"; payload: string }
  | { type: "SET_SAVED_JOBS"; payload: string[] }
  | { type: "APPLY_JOB"; payload: string }; // ✅ New action

interface AppContextValue extends AppState {
  fetchJobsData: () => Promise<void>;
  saveJob: (jobId: string) => void;
  removeJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  applyToJob: (jobId: string) => void; // ✅ New method
  isJobApplied: (jobId: string) => boolean; // ✅ New helper
  getSavedJobs: () => Job[];
  getJobById: (jobId: string) => Job | undefined;
  toggleTheme: () => void;
  theme: ThemeMode;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_JOBS":
      return { ...state, jobs: action.payload, error: null };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SAVE_JOB":
      if (state.savedJobIds.includes(action.payload)) return state;
      return { ...state, savedJobIds: [...state.savedJobIds, action.payload] };
    case "APPLY_JOB": // ✅ Handle applying
      if (state.appliedJobIds.includes(action.payload)) return state;
      return {
        ...state,
        appliedJobIds: [...state.appliedJobIds, action.payload],
      };
    case "REMOVE_JOB":
      return {
        ...state,
        savedJobIds: state.savedJobIds.filter((id) => id !== action.payload),
      };
    case "SET_SAVED_JOBS":
      return { ...state, savedJobIds: action.payload };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { toggleTheme, theme } = useTheme();
  const [state, dispatch] = useReducer(appReducer, {
    jobs: [],
    savedJobIds: [],
    appliedJobIds: [], // ✅ Reset on restart
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const initializeSavedJobs = async () => {
      const savedIds = await loadSavedJobs();
      dispatch({ type: "SET_SAVED_JOBS", payload: savedIds });
    };
    initializeSavedJobs();
  }, []);

  useEffect(() => {
    saveSavedJobs(state.savedJobIds);
  }, [state.savedJobIds]);

  const fetchJobsData = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const jobsData = await fetchJobs();
      dispatch({ type: "SET_JOBS", payload: jobsData });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to fetch jobs",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const saveJob = (jobId: string) =>
    dispatch({ type: "SAVE_JOB", payload: jobId });
  const removeJob = (jobId: string) =>
    dispatch({ type: "REMOVE_JOB", payload: jobId });
  const isJobSaved = (jobId: string) => state.savedJobIds.includes(jobId);

  const applyToJob = (jobId: string) =>
    dispatch({ type: "APPLY_JOB", payload: jobId });
  const isJobApplied = (jobId: string) => state.appliedJobIds.includes(jobId);

  const getSavedJobs = () =>
    state.jobs.filter((job) => state.savedJobIds.includes(job.id));
  const getJobById = (jobId: string) =>
    state.jobs.find((job) => job.id === jobId);

  const value: AppContextValue = {
    ...state,
    fetchJobsData,
    saveJob,
    removeJob,
    isJobSaved,
    applyToJob,
    isJobApplied,
    getSavedJobs,
    getJobById,
    toggleTheme,
    theme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useApp must be used within an AppProvider");
  return context;
};
