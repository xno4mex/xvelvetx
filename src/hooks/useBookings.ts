import { useState, useEffect } from 'react';
import { Booking } from '../types/database';
import { BookingService } from '../services/bookingService';
import { subscribeToUserBookings, unsubscribeChannel } from '../utils/realtimeHelpers';
import { getErrorMessage } from '../utils';

export const useBookings = (userId: string | null) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await BookingService.getUserBookings(userId);
        setBookings(data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

    const channel = subscribeToUserBookings(
      userId,
      (updatedBooking) => {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === updatedBooking.id ? updatedBooking : booking
          )
        );
      },
      (newBooking) => {
        setBookings((prev) => [newBooking, ...prev]);
      },
      (deletedId) => {
        setBookings((prev) => prev.filter((booking) => booking.id !== deletedId));
      }
    );

    return () => {
      unsubscribeChannel(channel);
    };
  }, [userId]);

  const refresh = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await BookingService.getUserBookings(userId);
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return { bookings, loading, error, refresh };
};



