-- Миграции для будущих обновлений схемы базы данных

-- Миграция 001: Добавление поля для хранения настроек пользователя
-- CREATE TABLE IF NOT EXISTS user_settings (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
--   notifications_enabled BOOLEAN DEFAULT true,
--   email_notifications BOOLEAN DEFAULT true,
--   sms_notifications BOOLEAN DEFAULT false,
--   theme TEXT DEFAULT 'light',
--   language TEXT DEFAULT 'ru',
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Миграция 002: Добавление поля для промо-кодов
-- CREATE TABLE IF NOT EXISTS promo_codes (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   code TEXT UNIQUE NOT NULL,
--   discount_percentage INTEGER CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
--   discount_amount DECIMAL(10,2),
--   valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   valid_until TIMESTAMP WITH TIME ZONE,
--   max_uses INTEGER,
--   current_uses INTEGER DEFAULT 0,
--   is_active BOOLEAN DEFAULT true,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Миграция 003: Добавление истории использования промо-кодов
-- CREATE TABLE IF NOT EXISTS promo_code_usage (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   promo_code_id UUID REFERENCES promo_codes(id) ON DELETE CASCADE,
--   user_id UUID REFERENCES users(id) ON DELETE CASCADE,
--   booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
--   discount_applied DECIMAL(10,2),
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Миграция 004: Добавление поля для хранения избранных услуг
-- CREATE TABLE IF NOT EXISTS favorite_services (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   user_id UUID REFERENCES users(id) ON DELETE CASCADE,
--   service_id UUID REFERENCES services(id) ON DELETE CASCADE,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   UNIQUE(user_id, service_id)
-- );

-- Миграция 005: Добавление таблицы для мастеров
-- CREATE TABLE IF NOT EXISTS masters (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   full_name TEXT NOT NULL,
--   description TEXT,
--   avatar_url TEXT,
--   specialization TEXT,
--   experience_years INTEGER,
--   is_active BOOLEAN DEFAULT true,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Миграция 006: Добавление связи между услугами и мастерами
-- CREATE TABLE IF NOT EXISTS service_masters (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   service_id UUID REFERENCES services(id) ON DELETE CASCADE,
--   master_id UUID REFERENCES masters(id) ON DELETE CASCADE,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   UNIQUE(service_id, master_id)
-- );

-- Миграция 007: Добавление мастера к бронированиям
-- ALTER TABLE bookings ADD COLUMN master_id UUID REFERENCES masters(id);

-- Миграция 008: Добавление поля для рабочих часов мастеров
-- CREATE TABLE IF NOT EXISTS master_schedule (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   master_id UUID REFERENCES masters(id) ON DELETE CASCADE,
--   day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
--   start_time TIME NOT NULL,
--   end_time TIME NOT NULL,
--   is_available BOOLEAN DEFAULT true,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Миграция 009: Добавление уведомлений
-- CREATE TABLE IF NOT EXISTS notifications (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   user_id UUID REFERENCES users(id) ON DELETE CASCADE,
--   title TEXT NOT NULL,
--   message TEXT NOT NULL,
--   type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')),
--   is_read BOOLEAN DEFAULT false,
--   related_booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Миграция 010: Добавление индексов для оптимизации
-- CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
-- CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
-- CREATE INDEX IF NOT EXISTS idx_favorite_services_user_id ON favorite_services(user_id);
-- CREATE INDEX IF NOT EXISTS idx_promo_code_usage_user_id ON promo_code_usage(user_id);



