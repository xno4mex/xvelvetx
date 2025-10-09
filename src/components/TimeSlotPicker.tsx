import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BookingService } from '../services/bookingService';
import { TimeSlot } from '../types/database';
import { getErrorMessage } from '../utils';

interface TimeSlotPickerProps {
  serviceId: string;
  selectedDate: string;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  serviceId,
  selectedDate,
  selectedTime,
  onSelectTime,
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTimeSlots();
  }, [serviceId, selectedDate]);

  const loadTimeSlots = async () => {
    try {
      setLoading(true);
      const slots = await BookingService.getAvailableTimeSlots(selectedDate, serviceId);
      setTimeSlots(slots);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="py-8 items-center">
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="py-4">
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View className="py-4">
      <Text className="text-lg font-semibold mb-3 text-gray-800">
        Выберите время
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        <View className="flex-row gap-2">
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot.time}
              onPress={() => slot.is_available && onSelectTime(slot.time)}
              disabled={!slot.is_available}
              className={`
                px-4 py-3 rounded-lg border-2 min-w-[80px] items-center
                ${selectedTime === slot.time
                  ? 'bg-purple-600 border-purple-600'
                  : slot.is_available
                  ? 'bg-white border-gray-300'
                  : 'bg-gray-100 border-gray-200'
                }
              `}
            >
              <Text
                className={`
                  font-semibold
                  ${selectedTime === slot.time
                    ? 'text-white'
                    : slot.is_available
                    ? 'text-gray-800'
                    : 'text-gray-400'
                  }
                `}
              >
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};



