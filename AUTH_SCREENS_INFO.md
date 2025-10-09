# 🔐 Экраны аутентификации

## Созданные экраны

### 1. WelcomeScreen (Приветствие)
**Путь:** `src/screens/WelcomeScreen.tsx`

Первый экран, который видит неавторизованный пользователь.

**Функционал:**
- Приветственное сообщение
- Основные преимущества приложения
- Кнопки "Войти" и "Зарегистрироваться"

### 2. LoginScreen (Вход)
**Путь:** `src/screens/LoginScreen.tsx`

Экран входа в систему.

**Поля:**
- Email
- Пароль

**Функционал:**
- Валидация email
- Обработка ошибок
- Индикатор загрузки
- Переход на экран регистрации

### 3. RegisterScreen (Регистрация)
**Путь:** `src/screens/RegisterScreen.tsx`

Экран регистрации нового пользователя.

**Поля:**
- Полное имя
- Email
- Телефон
- Пароль
- Подтверждение пароля

**Валидация:**
- ✅ Проверка формата email
- ✅ Проверка телефона
- ✅ Минимум 2 символа в имени
- ✅ Минимум 6 символов в пароле
- ✅ Наличие букв и цифр
- ✅ Совпадение паролей

## Логика навигации

### Для неавторизованных пользователей:
```
Welcome → Login → Register
   ↓         ↓
   →    Main App
```

### Для авторизованных пользователей:
```
Main App (TabNavigator)
├── Home
├── Services
├── Booking
└── Profile
```

## Автоматическая навигация

`AppNavigator.tsx` автоматически определяет:
- Если `user === null` → показывает экраны Welcome/Login/Register
- Если `user !== null` → показывает Main (TabNavigator)

## Как это работает

### 1. При запуске приложения
```typescript
const { user, loading } = useAuth();

if (loading) {
  return <LoadingSpinner />;
}

return user ? <MainApp /> : <AuthScreens />;
```

### 2. После успешной регистрации
```typescript
await signUp(email, password, fullName, phone);
// Показывается Alert
// Перенаправление на Login
```

### 3. После успешного входа
```typescript
await signIn(email, password);
// AuthContext обновляет user
// Навигация автоматически переключается на Main
```

### 4. При выходе
```typescript
await signOut();
// user становится null
// Навигация автоматически переключается на Welcome
```

## Компоненты

### BeautifulInput
Используется для всех полей ввода:
```typescript
<BeautifulInput
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
```

### BeautifulButton
Используется для всех кнопок:
```typescript
<BeautifulButton
  title="Войти"
  onPress={handleLogin}
  disabled={loading}
/>

// Вариант с outline стилем
<BeautifulButton
  title="Зарегистрироваться"
  onPress={handleRegister}
  variant="outline"
/>
```

## Цветовая схема

- **Primary**: Фиолетовый (#8B5CF6)
- **Text**: Темно-серый (#1F2937)
- **Secondary Text**: Серый (#6B7280)
- **Background**: Белый (#FFFFFF)

## Адаптивность

Все экраны используют:
- `KeyboardAvoidingView` для iOS/Android
- `ScrollView` для прокрутки на маленьких экранах
- Адаптивные отступы

## Обработка ошибок

### Общие ошибки
```typescript
try {
  await signIn(email, password);
} catch (error) {
  Alert.alert('Ошибка', getErrorMessage(error));
}
```

### Типичные ошибки Supabase
- `invalid_credentials` → "Неверный email или пароль"
- `email_not_confirmed` → "Email не подтвержден"
- `user_already_exists` → "Пользователь уже существует"
- `weak_password` → "Пароль слишком слабый"

## Настройка

### Отключить email подтверждение (для разработки)
1. Supabase Dashboard → Authentication → Settings
2. Email Auth → Disable "Confirm email"

### Изменить минимальную длину пароля
В `src/utils/validators.ts`:
```typescript
if (password.length < 6) {
  // Измените на нужное значение
}
```

## Тестирование

### Проверьте:
1. ✅ Регистрация нового пользователя
2. ✅ Вход существующего пользователя
3. ✅ Валидация полей
4. ✅ Обработка ошибок
5. ✅ Индикаторы загрузки
6. ✅ Автоматическое перенаправление
7. ✅ Выход из аккаунта

### Тестовые данные
```typescript
// Для быстрого тестирования
const testUser = {
  fullName: 'Тест Тестов',
  email: 'test@example.com',
  phone: '+79001234567',
  password: 'test123'
};
```

## Возможные улучшения

- [ ] Восстановление пароля
- [ ] Вход через соцсети (Google, Apple)
- [ ] Запомнить меня
- [ ] Биометрическая аутентификация
- [ ] 2FA (двухфакторная аутентификация)
- [ ] Валидация email в реальном времени
- [ ] Индикатор силы пароля
- [ ] Автозаполнение (iOS/Android)

## FAQ

### Почему не работает вход?
1. Проверьте настройки Supabase (email confirmation)
2. Убедитесь, что пользователь зарегистрирован
3. Проверьте правильность пароля

### Как добавить восстановление пароля?
```typescript
const { error } = await supabase.auth.resetPasswordForEmail(email);
```

### Как изменить дизайн экранов?
Все стили в Tailwind CSS классах, просто измените className.

---

**Готово!** Теперь у вас есть полноценная система аутентификации 🎉



