# xVelvetx - Приложение для бронирования услуг салона красоты

React Native приложение для бронирования услуг салона красоты с использованием Supabase в качестве backend.

## 🚀 Возможности

- ✅ Регистрация и аутентификация пользователей
- ✅ Просмотр каталога услуг с фильтрацией
- ✅ Бронирование услуг с выбором даты и времени
- ✅ Управление профилем пользователя
- ✅ Загрузка аватара
- ✅ Система отзывов и рейтингов
- ✅ Realtime обновления бронирований
- ✅ История записей
- ✅ Уведомления о статусе записей

## 🛠 Технологический стек

- **Frontend**: React Native + Expo
- **Навигация**: React Navigation
- **Backend**: Supabase (PostgreSQL)
- **Аутентификация**: Supabase Auth
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime
- **Стилизация**: NativeWind (Tailwind CSS для React Native)
- **Язык**: TypeScript

## 📦 Установка

### Предварительные требования

- Node.js 18+
- npm или yarn
- Expo CLI
- Аккаунт Supabase

### Шаги установки

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd xvelvetx
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
```

3. Настройте Supabase:
- Следуйте инструкциям в [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- Обновите файл `src/config/supabase.ts` с вашими учетными данными

4. Запустите приложение:
```bash
npm start
# или
yarn start
```

## 📱 Структура проекта

```
xvelvetx/
├── src/
│   ├── components/          # Переиспользуемые компоненты
│   │   ├── AvatarPicker.tsx
│   │   ├── BeautifulButton.tsx
│   │   ├── BeautifulInput.tsx
│   │   ├── BookingCard.tsx
│   │   ├── BookingStatusBadge.tsx
│   │   ├── Rating.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── ServiceCard.tsx
│   │   └── TimeSlotPicker.tsx
│   ├── config/              # Конфигурация
│   │   └── supabase.ts
│   ├── context/             # React Context
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/               # Кастомные хуки
│   │   ├── useBookings.ts
│   │   ├── useReviews.ts
│   │   └── useServices.ts
│   ├── navigation/          # Навигация
│   │   ├── AppNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── screens/             # Экраны приложения
│   │   ├── WelcomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── BookingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── ServicesScreen.tsx
│   ├── services/            # API сервисы
│   │   ├── authService.ts
│   │   ├── bookingService.ts
│   │   ├── reviewService.ts
│   │   └── storageService.ts
│   ├── types/               # TypeScript типы
│   │   ├── api.ts
│   │   ├── database.ts
│   │   └── navigation.ts
│   └── utils/               # Утилиты
│       ├── asyncStorage.ts
│       ├── constants.ts
│       ├── dateHelpers.ts
│       ├── formatters.ts
│       ├── imageHelpers.ts
│       ├── realtimeHelpers.ts
│       ├── supabaseErrors.ts
│       └── validators.ts
├── assets/                  # Ресурсы (иконки, изображения)
├── App.tsx                  # Главный компонент
├── supabase-schema.sql      # SQL схема базы данных
├── supabase-migrations.sql  # Миграции базы данных
├── SUPABASE_SETUP.md       # Инструкции по настройке Supabase
├── USAGE_EXAMPLES.md       # Примеры использования
├── SECURITY_BEST_PRACTICES.md # Лучшие практики безопасности
└── package.json
```

## 📚 Документация

- [Настройка Supabase](./SUPABASE_SETUP.md) - Подробные инструкции по настройке backend
- [Примеры использования](./USAGE_EXAMPLES.md) - Примеры кода для различных сценариев
- [Безопасность и лучшие практики](./SECURITY_BEST_PRACTICES.md) - Рекомендации по безопасности
- [Экраны аутентификации](./AUTH_SCREENS_INFO.md) - Информация об экранах входа и регистрации
- [FAQ](./FAQ.md) - Часто задаваемые вопросы

## 🔑 Основные компоненты

### Сервисы

#### AuthService
Управление аутентификацией пользователей:
- `signUp()` - Регистрация
- `signIn()` - Вход
- `signOut()` - Выход
- `getCurrentUser()` - Получение текущего пользователя
- `updateProfile()` - Обновление профиля

#### BookingService
Управление бронированиями:
- `getServices()` - Получение списка услуг
- `getAvailableTimeSlots()` - Получение доступных слотов
- `createBooking()` - Создание записи
- `getUserBookings()` - Получение записей пользователя
- `cancelBooking()` - Отмена записи

#### ReviewService
Управление отзывами:
- `createReview()` - Создание отзыва
- `getServiceReviews()` - Получение отзывов на услугу
- `getServiceAverageRating()` - Расчет среднего рейтинга

#### StorageService
Управление файлами:
- `uploadAvatar()` - Загрузка аватара
- `deleteAvatar()` - Удаление аватара
- `getAvatarUrl()` - Получение URL аватара

### Хуки

- `useBookings(userId)` - Управление бронированиями с realtime обновлениями
- `useServices()` - Работа с услугами
- `useServiceReviews(serviceId)` - Работа с отзывами на услугу
- `useUserReviews(userId)` - Получение отзывов пользователя

### Компоненты

- `ServiceCard` - Карточка услуги
- `BookingCard` - Карточка бронирования
- `ReviewCard` - Карточка отзыва
- `Rating` - Компонент рейтинга
- `AvatarPicker` - Загрузка аватара
- `TimeSlotPicker` - Выбор времени
- `BookingStatusBadge` - Бейдж статуса

## 🔐 Безопасность

- Row Level Security (RLS) включен на всех таблицах
- Политики доступа настроены для защиты пользовательских данных
- Токены хранятся в безопасном AsyncStorage
- Валидация данных на клиенте и сервере
- Защита от SQL-инъекций через Supabase

## 🚀 Деплой

### Подготовка к продакшену

1. Обновите переменные окружения
2. Проверьте все RLS политики
3. Настройте индексы для оптимизации
4. Включите логирование ошибок
5. Протестируйте все сценарии

### Сборка

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## 🧪 Тестирование

```bash
# Запуск тестов
npm test

# Проверка типов
npm run type-check

# Линтинг
npm run lint
```

## 📝 База данных

### Таблицы

- `users` - Профили пользователей
- `services` - Услуги салона
- `bookings` - Бронирования
- `reviews` - Отзывы

### Storage Buckets

- `avatars` - Аватары пользователей

## 🔄 Realtime

Приложение использует Supabase Realtime для:
- Автоматического обновления списка бронирований
- Мгновенного отображения новых отзывов
- Синхронизации данных между устройствами

## 🤝 Вклад в проект

1. Fork проекта
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменений (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

MIT License

## 📧 Контакты

Для вопросов и предложений создайте Issue в репозитории.

## 🙏 Благодарности

- [Supabase](https://supabase.com) - Backend платформа
- [Expo](https://expo.dev) - React Native фреймворк
- [NativeWind](https://www.nativewind.dev) - Tailwind для React Native

