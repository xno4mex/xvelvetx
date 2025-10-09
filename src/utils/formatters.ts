export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString('en-US')}`;
};

export const formatDuration = (minutes: number, language: string = 'ru'): string => {
  if (minutes < 60) {
    switch (language) {
      case 'en': return `${minutes}m`;
      case 'fr': return `${minutes}min`;
      case 'uk': return `${minutes} хв`;
      case 'de': return `${minutes} Min`;
      default: return `${minutes} мин`;
    }
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) {
    switch (language) {
      case 'en': return `${hours}h`;
      case 'fr': return `${hours}h`;
      case 'uk': return `${hours} год`;
      case 'de': return `${hours}h`;
      default: return `${hours} ч`;
    }
  }
  
  switch (language) {
    case 'en': return `${hours}h ${mins}m`;
    case 'fr': return `${hours}h ${mins}min`;
    case 'uk': return `${hours} год ${mins} хв`;
    case 'de': return `${hours}h ${mins} Min`;
    default: return `${hours} ч ${mins} мин`;
  }
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
  }
  
  return phone;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getInitials = (fullName: string): string => {
  const names = fullName.trim().split(' ');
  
  if (names.length === 0) {
    return '';
  }
  
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'Произошла неизвестная ошибка';
};


