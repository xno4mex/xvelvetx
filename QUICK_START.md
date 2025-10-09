# 🚀 Быстрый старт

## 1️⃣ Настройка Supabase (5 минут)

### Создайте проект
1. Зайдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Скопируйте URL и anon key

### Выполните SQL
1. Откройте SQL Editor в Supabase
2. Скопируйте содержимое файла `supabase-schema.sql`
3. Выполните скрипт

### Обновите конфигурацию
Отредактируйте `src/config/supabase.ts`:
```typescript
const supabaseUrl = 'ВАШ_URL';
const supabaseAnonKey = 'ВАШ_КЛЮЧ';
```

## 2️⃣ Установка зависимостей

```bash
npm install
# или
yarn install
```

## 3️⃣ Запуск приложения

```bash
npm start
# или
yarn start
```

## 4️⃣ Первый запуск

1. Запустите приложение на эмуляторе или устройстве
2. Вы увидите экран приветствия (WelcomeScreen)
3. Нажмите "Зарегистрироваться"
4. Заполните форму регистрации
5. После регистрации войдите в систему
6. Проверьте, что профиль создался автоматически в Supabase

## 📚 Основные файлы

| Файл | Описание |
|------|----------|
| `SUPABASE_COMPLETE.md` | Полный список настроек |
| `SUPABASE_SETUP.md` | Подробная инструкция по настройке |
| `USAGE_EXAMPLES.md` | Примеры кода |
| `SECURITY_BEST_PRACTICES.md` | Рекомендации по безопасности |
| `AUTH_SCREENS_INFO.md` | Информация об экранах аутентификации |
| `FAQ.md` | Часто задаваемые вопросы |

## 🔧 Основные сервисы

```typescript
import { useAuth } from './src/context/AuthContext';
import { useServices, useBookings, useServiceReviews } from './src/hooks';

// Аутентификация
const { user, signIn, signUp, signOut } = useAuth();

// Услуги
const { services, loading } = useServices();

// Бронирования
const { bookings, refresh } = useBookings(user?.id);

// Отзывы
const { reviews, averageRating } = useServiceReviews(serviceId);
```

## 🎨 Готовые компоненты

```typescript
import {
  ServiceCard,
  BookingCard,
  ReviewCard,
  Rating,
  AvatarPicker,
  TimeSlotPicker,
  BookingStatusBadge,
} from './src/components';
```

## ⚡ Быстрые команды

```bash
# Запуск
npm start

# iOS
npm run ios

# Android
npm run android

# Очистка кэша
npx expo start -c
```

## 🔍 Проверка работы

### Проверьте в Supabase Dashboard:

1. **Table Editor → users**
   - Должен появиться ваш профиль после регистрации

2. **Table Editor → services**
   - Должны быть 6 тестовых услуг

3. **Authentication → Users**
   - Должен быть зарегистрированный пользователь

4. **Storage → avatars**
   - Bucket должен быть создан

### Проверьте в приложении:

1. ✅ Регистрация работает
2. ✅ Вход работает
3. ✅ Список услуг загружается
4. ✅ Можно создать бронирование
5. ✅ Можно добавить отзыв
6. ✅ Можно загрузить аватар

## 🆘 Частые проблемы

### Ошибка "JWT expired"
```typescript
// Проверьте, что включено автообновление токенов
auth: {
  autoRefreshToken: true,
  persistSession: true,
}
```

### Ошибка "Row Level Security"
```sql
-- Проверьте, что выполнили весь SQL-скрипт
-- и включили RLS политики
```

### Ошибка при загрузке аватара
```typescript
// Проверьте, что bucket создан
// и размер файла < 5MB
```

## 📝 Что дальше?

1. Изучите примеры в `USAGE_EXAMPLES.md`
2. Добавьте свои услуги в Supabase
3. Настройте дизайн компонентов
4. Добавьте функционал из `supabase-migrations.sql`

## 🎯 Готово!

Теперь у вас есть:
- ✅ База данных с 4 таблицами
- ✅ Аутентификация пользователей
- ✅ Система бронирований
- ✅ Отзывы и рейтинги
- ✅ Загрузка файлов
- ✅ Realtime обновления
- ✅ 40+ готовых файлов
- ✅ Типизация TypeScript
- ✅ Готовые компоненты UI

**Приятной разработки! 🚀**

