export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const BOOKING_STATUS_LABELS = {
  pending: 'Ожидает подтверждения',
  confirmed: 'Подтверждена',
  cancelled: 'Отменена',
  completed: 'Завершена',
} as const;

export const SERVICE_CATEGORIES = [
  'Маникюр и педикюр',
  'Массаж',
  'Парикмахерские услуги',
  'Макияж',
  'Брови и ресницы',
  'Косметология',
  'Эпиляция',
  'Татуаж',
  'Другое',
] as const;

export const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
] as const;

export const RATING_VALUES = [1, 2, 3, 4, 5] as const;

export const AVATAR_MAX_SIZE = 5 * 1024 * 1024;
export const AVATAR_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];



