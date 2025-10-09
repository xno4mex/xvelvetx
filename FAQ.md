# ❓ Часто задаваемые вопросы (FAQ)

## Общие вопросы

### Что такое Supabase?
Supabase - это открытая альтернатива Firebase, предоставляющая backend-as-a-service с PostgreSQL базой данных, аутентификацией, хранилищем файлов и realtime подписками.

### Нужно ли платить за Supabase?
Supabase предоставляет бесплатный план (Free tier) для разработки и тестирования. Для продакшена могут потребоваться платные планы в зависимости от нагрузки.

### Можно ли использовать другой backend?
Да, но потребуется переписать все сервисы в папке `src/services/`. Структура приложения позволяет легко заменить backend.

## Настройка

### Как получить ключи Supabase?
1. Создайте проект на [supabase.com](https://supabase.com)
2. Перейдите в Settings → API
3. Скопируйте Project URL и anon/public key

### Где хранить ключи безопасно?
Создайте файл `.env` (он в .gitignore) и используйте переменные окружения. Никогда не коммитьте ключи в репозиторий.

### Как выполнить SQL-скрипт?
1. Откройте Supabase Dashboard
2. Перейдите в SQL Editor
3. Создайте новый запрос
4. Вставьте содержимое `supabase-schema.sql`
5. Нажмите Run

### Не создается таблица users после регистрации
Проверьте, что:
1. Выполнен триггер `on_auth_user_created`
2. Функция `handle_new_user()` создана
3. В meta_data передаются full_name и phone при регистрации

## Аутентификация

### Пользователь не может войти
Проверьте:
1. Email подтвержден (в Settings → Authentication включите auto-confirm)
2. Пароль соответствует требованиям (минимум 6 символов)
3. Нет опечаток в email

### Как включить автоподтверждение email?
1. Supabase Dashboard → Authentication → Settings
2. Включите "Enable email confirmations"
3. Для разработки можете отключить подтверждение

### Токен истекает слишком быстро
Проверьте настройки в `supabase.ts`:
```typescript
auth: {
  autoRefreshToken: true,
  persistSession: true,
}
```

### Как добавить социальные сети (Google, Apple)?
1. В Supabase Dashboard → Authentication → Providers
2. Включите нужный провайдер
3. Добавьте учетные данные OAuth
4. Используйте `supabase.auth.signInWithOAuth()`

## База данных

### Не могу получить данные из таблицы
Проверьте:
1. RLS политики разрешают доступ
2. Пользователь аутентифицирован
3. Запрос правильно сформирован
4. Таблица не пустая

### Ошибка "permission denied for table"
Это RLS блокирует доступ. Проверьте политики:
```sql
SELECT * FROM pg_policies WHERE tablename = 'ваша_таблица';
```

### Как добавить новое поле в таблицу?
```sql
ALTER TABLE users ADD COLUMN new_field TEXT;
```
Также обновите TypeScript типы в `src/types/database.ts`.

### Как удалить все тестовые данные?
```sql
DELETE FROM reviews;
DELETE FROM bookings;
DELETE FROM services;
-- users удалятся автоматически при удалении из auth.users
```

## Storage

### Не загружается аватар
Проверьте:
1. Bucket `avatars` создан
2. Размер файла < 5MB
3. Формат файла: jpg, png
4. Политики Storage настроены
5. Пользователь аутентифицирован

### Как изменить максимальный размер файла?
В `src/utils/constants.ts`:
```typescript
export const AVATAR_MAX_SIZE = 10 * 1024 * 1024; // 10MB
```

### Аватары не отображаются
Проверьте:
1. Bucket `avatars` публичный
2. URL правильный (используйте `getPublicUrl`)
3. Файл действительно загружен

### Как добавить другие типы файлов?
1. Создайте новый bucket в Storage
2. Настройте политики
3. Добавьте сервис для загрузки (аналогично StorageService)

## Realtime

### Realtime не работает
Проверьте:
1. Realtime включен в настройках проекта
2. Таблицы включены для Realtime
3. Подписка создана правильно
4. Отписка происходит при unmount

### Как включить Realtime для таблицы?
1. Supabase Dashboard → Database → Replication
2. Включите нужные таблицы
3. Сохраните изменения

### Слишком много подписок
Отписывайтесь от неиспользуемых каналов:
```typescript
useEffect(() => {
  const channel = supabase.channel('...');
  return () => supabase.removeChannel(channel);
}, []);
```

## Производительность

### Приложение медленно загружается
1. Используйте select только нужных полей
2. Добавьте индексы для частых запросов
3. Используйте пагинацию
4. Кэшируйте статичные данные

### Много повторных запросов
Используйте хуки (`useServices`, `useBookings`) - они кэшируют данные и используют Realtime для обновлений.

### Как добавить пагинацию?
```typescript
const { data } = await supabase
  .from('services')
  .select('*')
  .range(0, 9) // первые 10 записей
  .order('created_at', { ascending: false });
```

## Разработка

### Как запустить на iOS?
```bash
npm run ios
# или
npx expo run:ios
```

### Как запустить на Android?
```bash
npm run android
# или
npx expo run:android
```

### Expo не запускается
Попробуйте очистить кэш:
```bash
npx expo start -c
```

### TypeScript ошибки
Проверьте типы в `src/types/database.ts` соответствуют схеме БД.

### Как обновить зависимости?
```bash
npm update
# или
yarn upgrade
```

## Типичные ошибки

### "Network request failed"
Проверьте:
1. Интернет-соединение
2. URL Supabase правильный
3. Supabase проект активен

### "Invalid API key"
Проверьте:
1. Ключ скопирован полностью
2. Используется anon/public ключ
3. Проект Supabase активен

### "Row Level Security" ошибки
1. Проверьте, что RLS политики созданы
2. Убедитесь, что пользователь аутентифицирован
3. Проверьте, что user.id совпадает с auth.uid()

### "Cannot read property 'id' of null"
Пользователь не аутентифицирован. Добавьте проверку:
```typescript
if (!user) return;
```

## Деплой

### Как подготовить к продакшену?
1. Вынесите ключи в переменные окружения
2. Включите email подтверждение
3. Проверьте RLS политики
4. Настройте лимиты и квоты
5. Добавьте мониторинг ошибок

### Как собрать APK для Android?
```bash
eas build --platform android
```

### Как собрать для iOS?
```bash
eas build --platform ios
```
Требуется Apple Developer аккаунт.

## Расширение функционала

### Как добавить push-уведомления?
1. Установите expo-notifications
2. Настройте Firebase (Android) и APNs (iOS)
3. Сохраняйте токены в таблице users
4. Отправляйте через Supabase Edge Functions

### Как добавить платежи?
Интегрируйте Stripe или другой платежный шлюз:
1. Создайте таблицу payments
2. Используйте Stripe SDK
3. Webhook для подтверждения платежей

### Как добавить мастеров?
Используйте миграции из `supabase-migrations.sql` (миграции 005-008):
1. Создайте таблицу masters
2. Создайте связь service_masters
3. Добавьте master_id в bookings
4. Создайте расписание мастеров

### Как добавить промокоды?
Используйте миграцию 002-003 из `supabase-migrations.sql`.

## Поддержка

### Где найти больше информации?
- [Supabase Documentation](https://supabase.com/docs)
- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)

### Где искать помощь?
1. Документация проекта (README, USAGE_EXAMPLES, etc.)
2. Supabase Discord
3. Stack Overflow
4. GitHub Issues

### Как сообщить об ошибке?
Создайте Issue в репозитории проекта с описанием:
1. Что пытались сделать
2. Что ожидали
3. Что получили
4. Версии (React Native, Supabase, etc.)
5. Логи ошибок

---

**Не нашли ответ?** Проверьте документацию в файлах проекта или создайте Issue.



