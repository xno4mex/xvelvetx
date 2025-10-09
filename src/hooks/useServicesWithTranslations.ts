import { useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import { SERVICES_DATA, CATEGORIES_DATA, ServiceData } from '../data/services';

import { Service } from '../types/database';

// Интерфейс для переведенной услуги (совместимый с существующим Service)
export interface TranslatedService extends Omit<Service, 'name' | 'description' | 'category'> {
  name: string;
  description: string;
  category: string;
}

export const useServicesWithTranslations = () => {
  const { currentLanguage } = useLocale();

  // Переводим услуги на текущий язык
  const translatedServices = useMemo((): TranslatedService[] => {
    return SERVICES_DATA.map(service => ({
      id: service.id,
      name: service.name[currentLanguage],
      description: service.description[currentLanguage],
      category: service.category[currentLanguage],
      price: service.price,
      duration: service.duration,
      image_url: service.image_url,
      is_active: service.is_active,
      created_at: service.created_at,
      updated_at: service.updated_at,
    }));
  }, [currentLanguage]);

  // Переводим категории на текущий язык
  const translatedCategories = useMemo(() => {
    return CATEGORIES_DATA[currentLanguage];
  }, [currentLanguage]);

  // Функция для получения услуги по ID
  const getServiceById = (id: string): TranslatedService | null => {
    return translatedServices.find(service => service.id === id) || null;
  };

  // Функция для получения услуг по категории
  const getServicesByCategory = (category: string): TranslatedService[] => {
    if (category === translatedCategories[0]) { // "Все" / "All" etc.
      return translatedServices;
    }
    return translatedServices.filter(service => service.category === category);
  };

  return {
    services: translatedServices,
    categories: translatedCategories,
    getServiceById,
    getServicesByCategory,
    loading: false, // Для совместимости с существующим хуком
  };
};
