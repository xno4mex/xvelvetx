// Данные услуг с переводами
export interface ServiceData {
  id: string;
  name: {
    ru: string;
    en: string;
    fr: string;
    uk: string;
    de: string;
  };
  description: {
    ru: string;
    en: string;
    fr: string;
    uk: string;
    de: string;
  };
  category: {
    ru: string;
    en: string;
    fr: string;
    uk: string;
    de: string;
  };
  price: number;
  duration: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const SERVICES_DATA: ServiceData[] = [
  {
    id: 'eyebrows-1',
    name: {
      ru: 'Брови',
      en: 'Eyebrows',
      fr: 'Sourcils',
      uk: 'Брови',
      de: 'Augenbrauen'
    },
    description: {
      ru: 'Коррекция и окрашивание бровей',
      en: 'Eyebrow correction and coloring',
      fr: 'Correction et coloration des sourcils',
      uk: 'Корекція та фарбування брів',
      de: 'Augenbrauen-Korrektur und Färbung'
    },
    category: {
      ru: 'Брови и ресницы',
      en: 'Eyebrows and Eyelashes',
      fr: 'Sourcils et cils',
      uk: 'Брови та вії',
      de: 'Augenbrauen und Wimpern'
    },
    price: 25,
    duration: 30,
    image_url: 'https://example.com/eyebrows.jpg',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'makeup-1',
    name: {
      ru: 'Макияж',
      en: 'Makeup',
      fr: 'Maquillage',
      uk: 'Макіяж',
      de: 'Make-up'
    },
    description: {
      ru: 'Вечерний и дневной макияж',
      en: 'Evening and daytime makeup',
      fr: 'Maquillage du soir et de jour',
      uk: 'Вечірній та денний макіяж',
      de: 'Abend- und Tages-Make-up'
    },
    category: {
      ru: 'Макияж',
      en: 'Makeup',
      fr: 'Maquillage',
      uk: 'Макіяж',
      de: 'Make-up'
    },
    price: 80,
    duration: 90,
    image_url: 'https://example.com/makeup.jpg',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'manicure-1',
    name: {
      ru: 'Маникюр',
      en: 'Manicure',
      fr: 'Manucure',
      uk: 'Манікюр',
      de: 'Maniküre'
    },
    description: {
      ru: 'Классический и аппаратный маникюр',
      en: 'Classic and hardware manicure',
      fr: 'Manucure classique et à l\'appareil',
      uk: 'Класичний та апаратний манікюр',
      de: 'Klassische und Hardware-Muniküre'
    },
    category: {
      ru: 'Маникюр и педикюр',
      en: 'Manicure and Pedicure',
      fr: 'Manucure et pédicure',
      uk: 'Манікюр та педикюр',
      de: 'Maniküre und Pediküre'
    },
    price: 45,
    duration: 60,
    image_url: 'https://example.com/manicure.jpg',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'massage-1',
    name: {
      ru: 'Массаж лица',
      en: 'Facial Massage',
      fr: 'Massage du visage',
      uk: 'Масаж обличчя',
      de: 'Gesichtsmassage'
    },
    description: {
      ru: 'Расслабляющий массаж лица',
      en: 'Relaxing facial massage',
      fr: 'Massage relaxant du visage',
      uk: 'Розслабляючий масаж обличчя',
      de: 'Entspannende Gesichtsmassage'
    },
    category: {
      ru: 'Массаж',
      en: 'Massage',
      fr: 'Massage',
      uk: 'Масаж',
      de: 'Massage'
    },
    price: 65,
    duration: 45,
    image_url: 'https://example.com/massage.jpg',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const CATEGORIES_DATA = {
  ru: ['Все', 'Маникюр и педикюр', 'Массаж', 'Парикмахерские услуги', 'Макияж', 'Брови и ресницы'],
  en: ['All', 'Manicure and Pedicure', 'Massage', 'Hair Services', 'Makeup', 'Eyebrows and Eyelashes'],
  fr: ['Tous', 'Manucure et pédicure', 'Massage', 'Services capillaires', 'Maquillage', 'Sourcils et cils'],
  uk: ['Всі', 'Манікюр та педикюр', 'Масаж', 'Послуги перукарні', 'Макіяж', 'Брови та вії'],
  de: ['Alle', 'Maniküre und Pediküre', 'Massage', 'Haarservices', 'Make-up', 'Augenbrauen und Wimpern']
};
