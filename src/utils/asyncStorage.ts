import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  THEME: '@xvelvetx:theme',
  LANGUAGE: '@xvelvetx:language',
  ONBOARDING_COMPLETED: '@xvelvetx:onboarding',
  LAST_SYNC: '@xvelvetx:last_sync',
} as const;

export const AsyncStorageHelper = {
  async setTheme(theme: 'light' | 'dark'): Promise<void> {
    await AsyncStorage.setItem(KEYS.THEME, theme);
  },

  async getTheme(): Promise<'light' | 'dark' | null> {
    const theme = await AsyncStorage.getItem(KEYS.THEME);
    return theme as 'light' | 'dark' | null;
  },

  async setLanguage(language: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.LANGUAGE, language);
  },

  async getLanguage(): Promise<string | null> {
    return await AsyncStorage.getItem(KEYS.LANGUAGE);
  },

  async setOnboardingCompleted(completed: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETED, JSON.stringify(completed));
  },

  async getOnboardingCompleted(): Promise<boolean> {
    const completed = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETED);
    return completed ? JSON.parse(completed) : false;
  },

  async setLastSync(timestamp: number): Promise<void> {
    await AsyncStorage.setItem(KEYS.LAST_SYNC, timestamp.toString());
  },

  async getLastSync(): Promise<number | null> {
    const timestamp = await AsyncStorage.getItem(KEYS.LAST_SYNC);
    return timestamp ? parseInt(timestamp, 10) : null;
  },

  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  },

  async getItem(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  },

  async setObject<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async getObject<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  },
};



