import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import { Booking, Review } from '../types/database';

export const subscribeToUserBookings = (
  userId: string,
  onUpdate: (booking: Booking) => void,
  onInsert: (booking: Booking) => void,
  onDelete: (bookingId: string) => void
): RealtimeChannel => {
  const channel = supabase
    .channel(`user-bookings-${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'bookings',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onUpdate(payload.new as Booking);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'bookings',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onInsert(payload.new as Booking);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'bookings',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onDelete(payload.old.id);
      }
    )
    .subscribe();

  return channel;
};

export const subscribeToServiceReviews = (
  serviceId: string,
  onInsert: (review: Review) => void,
  onUpdate: (review: Review) => void,
  onDelete: (reviewId: string) => void
): RealtimeChannel => {
  const channel = supabase
    .channel(`service-reviews-${serviceId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'reviews',
        filter: `service_id=eq.${serviceId}`,
      },
      (payload) => {
        onInsert(payload.new as Review);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'reviews',
        filter: `service_id=eq.${serviceId}`,
      },
      (payload) => {
        onUpdate(payload.new as Review);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'reviews',
        filter: `service_id=eq.${serviceId}`,
      },
      (payload) => {
        onDelete(payload.old.id);
      }
    )
    .subscribe();

  return channel;
};

export const unsubscribeChannel = (channel: RealtimeChannel) => {
  supabase.removeChannel(channel);
};



