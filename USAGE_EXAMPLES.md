# Примеры использования Supabase в xVelvetx

## Оглавление
- [Аутентификация](#аутентификация)
- [Работа с профилем](#работа-с-профилем)
- [Работа с услугами](#работа-с-услугами)
- [Работа с бронированиями](#работа-с-бронированиями)
- [Работа с отзывами](#работа-с-отзывами)
- [Загрузка файлов](#загрузка-файлов)
- [Использование хуков](#использование-хуков)
- [Realtime подписки](#realtime-подписки)

## Аутентификация

### Регистрация пользователя

```typescript
import { useAuth } from '../context/AuthContext';

const SignUpScreen = () => {
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    try {
      await signUp(
        'user@example.com',
        'password123',
        'Иван Иванов',
        '+79001234567'
      );
      // Пользователь зарегистрирован
    } catch (error) {
      console.error(error);
    }
  };
};
```

### Вход пользователя

```typescript
import { useAuth } from '../context/AuthContext';

const SignInScreen = () => {
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn('user@example.com', 'password123');
      // Пользователь вошел
    } catch (error) {
      console.error(error);
    }
  };
};
```

### Выход пользователя

```typescript
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Пользователь вышел
    } catch (error) {
      console.error(error);
    }
  };
};
```

## Работа с профилем

### Получение текущего пользователя

```typescript
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <LoginPrompt />;

  return (
    <View>
      <Text>{user.full_name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.phone}</Text>
    </View>
  );
};
```

### Обновление профиля

```typescript
import { useAuth } from '../context/AuthContext';

const EditProfileScreen = () => {
  const { user, updateProfile } = useAuth();

  const handleUpdate = async () => {
    try {
      await updateProfile({
        full_name: 'Новое Имя',
        phone: '+79009999999',
      });
      // Профиль обновлен
    } catch (error) {
      console.error(error);
    }
  };
};
```

## Работа с услугами

### Получение списка услуг

```typescript
import { useServices } from '../hooks';

const ServicesScreen = () => {
  const { services, loading, error, refresh } = useServices();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <FlatList
      data={services}
      renderItem={({ item }) => <ServiceCard service={item} />}
      refreshing={loading}
      onRefresh={refresh}
    />
  );
};
```

### Фильтрация услуг по категории

```typescript
import { useServices } from '../hooks';

const CategoryScreen = ({ category }) => {
  const { getServicesByCategory } = useServices();
  const categoryServices = getServicesByCategory(category);

  return (
    <FlatList
      data={categoryServices}
      renderItem={({ item }) => <ServiceCard service={item} />}
    />
  );
};
```

## Работа с бронированиями

### Получение бронирований пользователя

```typescript
import { useBookings } from '../hooks';
import { useAuth } from '../context/AuthContext';

const BookingsScreen = () => {
  const { user } = useAuth();
  const { bookings, loading, error, refresh } = useBookings(user?.id || null);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <FlatList
      data={bookings}
      renderItem={({ item }) => <BookingCard booking={item} />}
      refreshing={loading}
      onRefresh={refresh}
    />
  );
};
```

### Создание бронирования

```typescript
import { BookingService } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';

const CreateBookingScreen = () => {
  const { user } = useAuth();

  const handleCreateBooking = async () => {
    try {
      const booking = await BookingService.createBooking({
        user_id: user!.id,
        service_id: 'service-uuid',
        booking_date: '2025-10-15',
        booking_time: '14:00',
        notes: 'Комментарий к записи',
      });
      // Бронирование создано
    } catch (error) {
      console.error(error);
    }
  };
};
```

### Отмена бронирования

```typescript
import { BookingService } from '../services/bookingService';

const BookingDetailsScreen = ({ bookingId }) => {
  const handleCancel = async () => {
    try {
      await BookingService.cancelBooking(bookingId);
      // Бронирование отменено
    } catch (error) {
      console.error(error);
    }
  };
};
```

### Получение доступных временных слотов

```typescript
import { TimeSlotPicker } from '../components';

const BookingFormScreen = () => {
  const [selectedDate, setSelectedDate] = useState('2025-10-15');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <TimeSlotPicker
      serviceId="service-uuid"
      selectedDate={selectedDate}
      selectedTime={selectedTime}
      onSelectTime={setSelectedTime}
    />
  );
};
```

## Работа с отзывами

### Получение отзывов на услугу

```typescript
import { useServiceReviews } from '../hooks';

const ServiceDetailsScreen = ({ serviceId }) => {
  const { reviews, averageRating, loading, error } = useServiceReviews(serviceId);

  return (
    <View>
      <Rating value={averageRating} showValue />
      <Text>{reviews.length} отзывов</Text>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewCard review={item} />}
      />
    </View>
  );
};
```

### Создание отзыва

```typescript
import { ReviewService } from '../services/reviewService';
import { useAuth } from '../context/AuthContext';

const CreateReviewScreen = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
      await ReviewService.createReview({
        user_id: user!.id,
        service_id: 'service-uuid',
        booking_id: 'booking-uuid',
        rating,
        comment,
      });
      // Отзыв создан
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Rating
        value={rating}
        editable
        onChange={setRating}
      />
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Ваш отзыв"
      />
      <Button onPress={handleSubmit} title="Отправить" />
    </View>
  );
};
```

### Получение отзывов пользователя

```typescript
import { useUserReviews } from '../hooks';
import { useAuth } from '../context/AuthContext';

const MyReviewsScreen = () => {
  const { user } = useAuth();
  const { reviews, loading, error, refresh } = useUserReviews(user?.id || null);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewCard review={item} />}
      refreshing={loading}
      onRefresh={refresh}
    />
  );
};
```

## Загрузка файлов

### Загрузка аватара

```typescript
import { AvatarPicker } from '../components';
import { useAuth } from '../context/AuthContext';

const EditProfileScreen = () => {
  const { user, updateProfile } = useAuth();

  const handleAvatarUpload = async (url: string) => {
    try {
      await updateProfile({ avatar_url: url });
      // Аватар обновлен
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AvatarPicker
      currentAvatarUrl={user?.avatar_url}
      userId={user!.id}
      onUploadSuccess={handleAvatarUpload}
      size={120}
    />
  );
};
```

### Ручная загрузка файла

```typescript
import { StorageService } from '../services/storageService';
import * as ImagePicker from 'expo-image-picker';

const uploadAvatar = async (userId: string) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled && result.assets[0].base64) {
    const url = await StorageService.uploadAvatar(
      userId,
      result.assets[0].base64,
      'jpg'
    );
    return url;
  }
};
```

## Использование хуков

### useBookings

```typescript
const { bookings, loading, error, refresh } = useBookings(userId);

// bookings - массив бронирований с автообновлением
// loading - состояние загрузки
// error - ошибка, если есть
// refresh - функция для принудительного обновления
```

### useServices

```typescript
const {
  services,
  loading,
  error,
  refresh,
  getServiceById,
  getServicesByCategory,
} = useServices();

// services - массив всех услуг
// getServiceById - получить услугу по ID
// getServicesByCategory - фильтр по категории
```

### useServiceReviews

```typescript
const { reviews, averageRating, loading, error, refresh } = useServiceReviews(serviceId);

// reviews - массив отзывов с автообновлением
// averageRating - средний рейтинг
```

## Realtime подписки

### Ручная подписка на бронирования

```typescript
import { subscribeToUserBookings, unsubscribeChannel } from '../utils';

useEffect(() => {
  const channel = subscribeToUserBookings(
    userId,
    (updated) => console.log('Updated:', updated),
    (created) => console.log('Created:', created),
    (deletedId) => console.log('Deleted:', deletedId)
  );

  return () => unsubscribeChannel(channel);
}, [userId]);
```

### Ручная подписка на отзывы

```typescript
import { subscribeToServiceReviews, unsubscribeChannel } from '../utils';

useEffect(() => {
  const channel = subscribeToServiceReviews(
    serviceId,
    (created) => console.log('New review:', created),
    (updated) => console.log('Updated review:', updated),
    (deletedId) => console.log('Deleted review:', deletedId)
  );

  return () => unsubscribeChannel(channel);
}, [serviceId]);
```

## Обработка ошибок

### Использование getErrorMessage

```typescript
import { getErrorMessage } from '../utils';

try {
  await someSupabaseOperation();
} catch (error) {
  const message = getErrorMessage(error);
  Alert.alert('Ошибка', message);
}
```

### Использование handleSupabaseError

```typescript
import { handleSupabaseError } from '../utils';

try {
  await someSupabaseOperation();
} catch (error) {
  const { message, details } = handleSupabaseError(error);
  console.error(details);
  Alert.alert('Ошибка', message);
}
```

## Валидация данных

```typescript
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateFullName,
} from '../utils';

const email = 'test@example.com';
if (!validateEmail(email)) {
  console.error('Invalid email');
}

const password = 'password123';
const { valid, message } = validatePassword(password);
if (!valid) {
  console.error(message);
}
```

## Форматирование данных

```typescript
import {
  formatPrice,
  formatDuration,
  formatDate,
  formatPhoneNumber,
  getInitials,
} from '../utils';

const price = formatPrice(1500); // "1 500 ₽"
const duration = formatDuration(90); // "1 ч 30 мин"
const date = formatDate(new Date()); // "07.10.2025"
const phone = formatPhoneNumber('79001234567'); // "+7 (900) 123-45-67"
const initials = getInitials('Иван Иванов'); // "ИИ"
```

## Компоненты

### ServiceCard

```typescript
<ServiceCard
  service={service}
  onPress={() => navigation.navigate('ServiceDetails', { id: service.id })}
  averageRating={4.5}
  reviewCount={23}
/>
```

### BookingCard

```typescript
<BookingCard
  booking={booking}
  onPress={() => navigation.navigate('BookingDetails', { id: booking.id })}
  onCancel={() => handleCancel(booking.id)}
  showActions={true}
/>
```

### ReviewCard

```typescript
<ReviewCard review={review} />
```

### Rating

```typescript
<Rating
  value={4.5}
  size={20}
  editable={true}
  onChange={(rating) => setRating(rating)}
  showValue={true}
/>
```

### BookingStatusBadge

```typescript
<BookingStatusBadge status="confirmed" />
```



