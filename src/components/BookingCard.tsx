import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Booking } from '../types/database';
import { formatDate, formatTime, formatPrice } from '../utils';
import { BookingStatusBadge } from './BookingStatusBadge';
import { useLocale } from '../context/LocaleContext';

interface BookingCardProps {
  booking: Booking;
  onPress?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onPress,
  onCancel,
  showActions = true,
}) => {
  const { t } = useLocale();
  const canCancel = booking.status === 'pending' || booking.status === 'confirmed';

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800 mb-1">
            {booking.service?.name}
          </Text>
          <Text className="text-gray-500 text-sm">
            {booking.service?.category}
          </Text>
        </View>
        <BookingStatusBadge status={booking.status} />
      </View>

      <View className="space-y-2 mb-3">
        <View className="flex-row items-center">
          <Text className="text-gray-500 mr-2">📅</Text>
          <Text className="text-gray-700">
            {formatDate(booking.booking_date)}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-gray-500 mr-2">🕐</Text>
          <Text className="text-gray-700">
            {formatTime(booking.booking_time)}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-gray-500 mr-2">⏱️</Text>
          <Text className="text-gray-700">
            {booking.service?.duration} {t('booking.minutes')}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-gray-500 mr-2">💰</Text>
          <Text className="text-gray-700 font-semibold">
            {formatPrice(booking.total_price)}
          </Text>
        </View>

        {booking.notes && (
          <View className="flex-row items-start">
            <Text className="text-gray-500 mr-2">📝</Text>
            <Text className="text-gray-700 flex-1">
              {booking.notes}
            </Text>
          </View>
        )}
      </View>

      {showActions && canCancel && onCancel && (
        <TouchableOpacity
          onPress={onCancel}
          className="bg-red-50 border border-red-200 rounded-lg py-3 items-center"
        >
          <Text className="text-red-600 font-semibold">
            {t('booking.cancelBooking')}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};


