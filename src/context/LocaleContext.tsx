import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { SupportedLanguage, setLanguage, getCurrentLanguage, supportedLanguages } from '../locales/i18n';

interface LocaleContextType {
  currentLanguage: SupportedLanguage;
  setCurrentLanguage: (language: SupportedLanguage) => Promise<void>;
  t: (key: string, options?: any) => string;
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<SupportedLanguage>('ru');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('userLanguage');
        if (savedLanguage && savedLanguage in supportedLanguages) {
          setCurrentLanguageState(savedLanguage as SupportedLanguage);
          i18n.locale = savedLanguage as SupportedLanguage;
        } else {
          setCurrentLanguageState('ru');
          i18n.locale = 'ru';
        }
      } catch (error) {
        console.warn('Failed to load saved language:', error);
        setCurrentLanguageState('ru');
        i18n.locale = 'ru';
      }
    };
    
    loadLanguage();
  }, []);

  const setCurrentLanguage = async (language: SupportedLanguage) => {
    await setLanguage(language);
    setCurrentLanguageState(language);
    i18n.locale = language;
    
    const isRightToLeft = language === 'ar' || language === 'he';
    setIsRTL(isRightToLeft);
    
    I18nManager.forceRTL(isRightToLeft);
  };

  const t = (key: string, options?: any) => {
    const translation = i18n.t(key, options);
    if (translation === key) {
      console.warn(`Missing translation for key: ${key} in language: ${i18n.locale}`);
    }
    return translation;
  };

  useEffect(() => {
    const isRightToLeft = currentLanguage === 'ar' || currentLanguage === 'he';
    setIsRTL(isRightToLeft);
  }, [currentLanguage]);

  const value: LocaleContextType = {
    currentLanguage,
    setCurrentLanguage,
    t,
    isRTL,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};
