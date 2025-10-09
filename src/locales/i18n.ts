import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';

import en from './en/common.json';
import ru from './ru/common.json';
import fr from './fr/common.json';
import uk from './uk/common.json';
import de from './de/common.json';

export const supportedLanguages = {
  en: 'English',
  ru: 'Русский',
  fr: 'Français',
  uk: 'Українська',
  de: 'Deutsch',
} as const;

export type SupportedLanguage = keyof typeof supportedLanguages;

const i18n = new I18n({
  en,
  ru,
  fr,
  uk,
  de,
});

i18n.defaultLocale = 'ru';
i18n.enableFallback = true;

export const initializeI18n = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('userLanguage');
    if (savedLanguage && savedLanguage in supportedLanguages) {
      i18n.locale = savedLanguage as SupportedLanguage;
      console.log(`i18n initialized with saved language: ${savedLanguage}`);
    } else {
      i18n.locale = 'ru';
      console.log('i18n initialized with default language: ru');
    }
  } catch (error) {
    console.warn('Failed to load saved language:', error);
    i18n.locale = 'ru';
  }
};

export const setLanguage = async (language: SupportedLanguage) => {
  i18n.locale = language;
  try {
    await AsyncStorage.setItem('userLanguage', language);
  } catch (error) {
    console.warn('Failed to save language:', error);
  }
};

export const getCurrentLanguage = (): SupportedLanguage => {
  return i18n.locale as SupportedLanguage;
};

export default i18n;
