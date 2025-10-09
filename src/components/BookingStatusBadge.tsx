import React from 'react';
import { View, Text } from 'react-native';
import { Booking } from '../types/database';
import { useLocale } from '../context/LocaleContext';

interface BookingStatusBadgeProps {
  status: Booking['status'];
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status }) => {
  const { t } = useLocale();
  
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'confirmed':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'cancelled':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'completed':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'pending':
        return t('status.pending');
      case 'confirmed':
        return t('status.confirmed');
      case 'cancelled':
        return t('status.cancelled');
      case 'completed':
        return t('status.completed');
      default:
        return status;
    }
  };

  return (
    <View className={`px-3 py-1 rounded-full border ${getStatusColor()}`}>
      <Text className={`text-xs font-semibold ${getStatusColor()}`}>
        {getStatusLabel()}
      </Text>
    </View>
  );
};


