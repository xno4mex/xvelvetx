# Настройка Supabase Storage для аватаров

## Проблема
Ошибка "new row violates row-level security policy" возникает при попытке загрузить аватар, потому что bucket `avatars` не настроен в Supabase Storage.

## Решение

### 1. Выполните SQL скрипт в Supabase Dashboard

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard)
2. Перейдите в ваш проект
3. Откройте раздел **SQL Editor**
4. Выполните SQL скрипт из файла `supabase-storage-setup.sql`:

```sql
-- Создание bucket для аватаров пользователей (если не существует)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Удаление существующих политик (если есть)
DROP POLICY IF EXISTS "Users can upload their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;

-- Политика для загрузки аватаров (только авторизованные пользователи могут загружать свои аватары)
CREATE POLICY "Users can upload their own avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Политика для обновления аватаров
CREATE POLICY "Users can update their own avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Политика для удаления аватаров
CREATE POLICY "Users can delete their own avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Политика для чтения аватаров (все могут читать аватары)
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');
```

### 2. Альтернативный способ через Supabase CLI

Если у вас установлен Supabase CLI:

```bash
supabase db reset
# или
supabase db push
```

### 3. Проверка настройки

После выполнения скрипта:

1. Перейдите в раздел **Storage** в Supabase Dashboard
2. Убедитесь, что bucket `avatars` создан и помечен как публичный
3. Проверьте, что политики RLS настроены правильно

## Структура файлов

Аватары будут сохраняться в структуре:
```
avatars/
  └── {user_id}/
      └── {user_id}-{timestamp}.{extension}
```

Это позволяет политикам RLS правильно определять владельца файла.

## Безопасность

- Только авторизованные пользователи могут загружать аватары
- Пользователи могут изменять только свои аватары
- Все пользователи могут просматривать аватары (публичный доступ)
