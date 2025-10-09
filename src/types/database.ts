export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // в минутах
  category: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  total_price: number;
  created_at: string;
  updated_at: string;
  user?: User;
  service?: Service;
}

export interface Review {
  id: string;
  user_id: string;
  service_id: string;
  booking_id: string;
  rating: number; // 1-5
  comment: string;
  created_at: string;
  updated_at: string;
  user?: User;
  service?: Service;
}

export interface TimeSlot {
  time: string;
  is_available: boolean;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Booking, 'id' | 'created_at' | 'updated_at'>>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Review, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}



