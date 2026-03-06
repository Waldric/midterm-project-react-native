import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme } from "../theme/theme.types";

const STORAGE_KEYS = {
  THEME: "@job_finder_theme",
  SAVED_JOBS: "@job_finder_saved_jobs",
};

export const saveTheme = async (theme: Theme): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error("Error saving theme:", error);
  }
};

export const loadTheme = async (): Promise<Theme | null> => {
  try {
    const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
    return theme as Theme | null;
  } catch (error) {
    console.error("Error loading theme:", error);
    return null;
  }
};

export const saveSavedJobs = async (jobIds: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(jobIds));
  } catch (error) {
    console.error("Error saving jobs:", error);
  }
};

export const loadSavedJobs = async (): Promise<string[]> => {
  try {
    const savedJobs = await AsyncStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
    return savedJobs ? JSON.parse(savedJobs) : [];
  } catch (error) {
    console.error("Error loading saved jobs:", error);
    return [];
  }
};
