# Безопасность и лучшие практики Supabase

## Безопасность

### 1. Защита ключей API

⚠️ **ВАЖНО**: Никогда не публикуйте ключи в публичных репозиториях!

**Плохо:**
```typescript
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';
```

**Хорошо:**
Используйте переменные окружения или конфигурационные файлы, добавленные в `.gitignore`.

```typescript
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_ANON_KEY;
```

### 2. Row Level Security (RLS)

✅ **Всегда включайте RLS** на таблицах с пользовательскими данными.

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

✅ **Создавайте строгие политики доступа:**

```sql
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);
```

### 3. Валидация данных

✅ Всегда валидируйте данные на клиенте перед отправкой:

```typescript
import { validateEmail, validatePassword } from '../utils';

const handleSignUp = async (email: string, password: string) => {
  if (!validateEmail(email)) {
    throw new Error('Неверный формат email');
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    throw new Error(passwordValidation.message);
  }

  // Продолжаем регистрацию...
};
```

### 4. Обработка ошибок

✅ Не показывайте пользователям технические детали ошибок:

```typescript
try {
  await supabase.from('users').select('*');
} catch (error) {
  // Плохо: console.error(error);
  
  // Хорошо:
  const userMessage = getErrorMessage(error);
  Alert.alert('Ошибка', userMessage);
  
  // Логируем детали только для разработки
  if (__DEV__) {
    console.error('Error details:', error);
  }
}
```

### 5. Аутентификация

✅ Используйте безопасные методы хранения токенов:

```typescript
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage, // Безопасное хранилище
    autoRefreshToken: true,
    persistSession: true,
  },
});
```

✅ Проверяйте статус аутентификации перед критическими операциями:

```typescript
const createBooking = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Необходима аутентификация');
  }
  
  // Продолжаем создание бронирования...
};
```

## Лучшие практики

### 1. Оптимизация запросов

✅ **Выбирайте только нужные поля:**

```typescript
// Плохо:
const { data } = await supabase.from('services').select('*');

// Хорошо:
const { data } = await supabase
  .from('services')
  .select('id, name, price, duration');
```

✅ **Используйте фильтры на сервере:**

```typescript
// Плохо:
const { data } = await supabase.from('services').select('*');
const activeServices = data?.filter(s => s.is_active);

// Хорошо:
const { data } = await supabase
  .from('services')
  .select('*')
  .eq('is_active', true);
```

✅ **Используйте пагинацию для больших списков:**

```typescript
const PAGE_SIZE = 20;

const { data, count } = await supabase
  .from('bookings')
  .select('*', { count: 'exact' })
  .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
```

### 2. Управление состоянием

✅ **Используйте хуки для автоматического обновления:**

```typescript
// Хорошо:
const { bookings, loading, error } = useBookings(userId);

// Вместо:
const [bookings, setBookings] = useState([]);
useEffect(() => {
  fetchBookings();
}, []);
```

✅ **Обрабатывайте состояния загрузки и ошибок:**

```typescript
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
if (!data) return <EmptyState />;

return <DataView data={data} />;
```

### 3. Realtime подписки

✅ **Всегда отписывайтесь при размонтировании:**

```typescript
useEffect(() => {
  const channel = supabase
    .channel('bookings')
    .on('postgres_changes', { ... }, handler)
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

⚠️ **Не создавайте слишком много подписок:**

```typescript
// Плохо:
services.forEach(service => {
  subscribeToServiceReviews(service.id, ...);
});

// Хорошо: подписывайтесь только на нужные данные
subscribeToServiceReviews(currentServiceId, ...);
```

### 4. Storage

✅ **Проверяйте размер файлов перед загрузкой:**

```typescript
import { AVATAR_MAX_SIZE, validateImageSize } from '../utils';

const isValid = await validateImageSize(uri);
if (!isValid) {
  Alert.alert('Ошибка', `Размер файла не должен превышать ${AVATAR_MAX_SIZE / 1024 / 1024}MB`);
  return;
}
```

✅ **Используйте правильные пути для файлов:**

```typescript
// Хорошо: организованная структура
const filePath = `${userId}/avatar.${ext}`;

// Плохо: все файлы в одной папке
const filePath = `avatar-${userId}.${ext}`;
```

### 5. Типизация

✅ **Используйте TypeScript типы:**

```typescript
import { Database } from '../types/database';

export const supabase = createClient<Database>(url, key);
```

✅ **Типизируйте ответы:**

```typescript
const { data } = await supabase
  .from('services')
  .select('*')
  .single();

// data автоматически типизирована как Service
```

### 6. Кэширование

✅ **Используйте локальное кэширование для часто используемых данных:**

```typescript
import { AsyncStorageHelper } from '../utils/asyncStorage';

const getCachedServices = async () => {
  const cached = await AsyncStorageHelper.getObject<Service[]>('services');
  
  if (cached) {
    return cached;
  }
  
  const { data } = await supabase.from('services').select('*');
  await AsyncStorageHelper.setObject('services', data);
  
  return data;
};
```

### 7. Обработка offline режима

✅ **Предусмотрите работу без интернета:**

```typescript
import NetInfo from '@react-native-community/netinfo';

const isConnected = await NetInfo.fetch().then(state => state.isConnected);

if (!isConnected) {
  // Показать кэшированные данные
  const cached = await getCachedData();
  return cached;
}

// Загрузить свежие данные
const fresh = await fetchFromSupabase();
```

### 8. Тестирование

✅ **Тестируйте с реальными данными:**

```sql
-- Используйте тестовые данные из SQL-скрипта
INSERT INTO services (name, description, price, duration, category)
VALUES ('Тестовая услуга', 'Описание', 1000, 60, 'Категория');
```

✅ **Проверяйте RLS политики:**

```typescript
// Попробуйте получить чужие данные
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', 'other-user-id');

// Должна вернуться ошибка или пустой массив
```

## Производительность

### 1. Индексы

✅ Создавайте индексы для часто используемых полей:

```sql
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
```

### 2. Оптимизация изображений

✅ Сжимайте изображения перед загрузкой:

```typescript
const result = await ImagePicker.launchImageLibraryAsync({
  quality: 0.8, // Сжатие до 80%
  allowsEditing: true,
  aspect: [1, 1],
});
```

### 3. Batch операции

✅ Объединяйте похожие запросы:

```typescript
// Плохо:
for (const booking of bookings) {
  await supabase.from('bookings').delete().eq('id', booking.id);
}

// Хорошо:
const ids = bookings.map(b => b.id);
await supabase.from('bookings').delete().in('id', ids);
```

## Мониторинг

### 1. Логирование

✅ Логируйте важные события:

```typescript
const logEvent = (event: string, data?: any) => {
  if (__DEV__) {
    console.log(`[${new Date().toISOString()}] ${event}`, data);
  }
  
  // В продакшене отправляйте в аналитику
};

logEvent('booking_created', { serviceId, date, time });
```

### 2. Отслеживание ошибок

✅ Отслеживайте и логируйте ошибки:

```typescript
const handleError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, error);
  
  // Отправка в систему мониторинга (Sentry, etc.)
  // ErrorTracker.captureError(error, { context });
};
```

## Чеклист перед продакшеном

- [ ] Все ключи API вынесены в переменные окружения
- [ ] RLS включен на всех таблицах
- [ ] Созданы все необходимые политики безопасности
- [ ] Настроены индексы для оптимизации
- [ ] Протестированы все сценарии аутентификации
- [ ] Проверена работа в offline режиме
- [ ] Настроено логирование ошибок
- [ ] Добавлены лимиты на размеры файлов
- [ ] Протестированы RLS политики
- [ ] Настроены email templates для аутентификации
- [ ] Проверена производительность с реальными объемами данных



