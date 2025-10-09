import { supabase } from '../config/supabase';
import { Booking, Service, TimeSlot } from '../types/database';

export class BookingService {
  static async getServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  static async getServiceById(id: string): Promise<Service> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async getAvailableTimeSlots(date: string, serviceId: string): Promise<TimeSlot[]> {
    const timeSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
    ];

    const { data: bookings } = await supabase
      .from('bookings')
      .select('booking_time')
      .eq('booking_date', date)
      .eq('service_id', serviceId)
      .in('status', ['pending', 'confirmed']);

    const bookedTimes = new Set(bookings?.map(b => b.booking_time) || []);

    return timeSlots.map(time => ({
      time,
      is_available: !bookedTimes.has(time)
    }));
  }

  static async createBooking(bookingData: {
    user_id: string;
    service_id: string;
    booking_date: string;
    booking_time: string;
    notes?: string;
  }): Promise<Booking> {
    const service = await this.getServiceById(bookingData.service_id);
    
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...bookingData,
        total_price: service.price,
        status: 'pending'
      })
      .select(`
        *,
        user:users(*),
        service:services(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserBookings(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        user:users(*),
        service:services(*)
      `)
      .eq('user_id', userId)
      .order('booking_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select(`
        *,
        user:users(*),
        service:services(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }

  static async cancelBooking(bookingId: string): Promise<Booking> {
    return this.updateBookingStatus(bookingId, 'cancelled');
  }
}



