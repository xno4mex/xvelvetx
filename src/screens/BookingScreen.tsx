import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const dates = [
    { date: '2024-01-15', day: 'Пн', dayNumber: '15' },
    { date: '2024-01-16', day: 'Вт', dayNumber: '16' },
    { date: '2024-01-17', day: 'Ср', dayNumber: '17' },
    { date: '2024-01-18', day: 'Чт', dayNumber: '18' },
    { date: '2024-01-19', day: 'Пт', dayNumber: '19' },
    { date: '2024-01-20', day: 'Сб', dayNumber: '20' },
    { date: '2024-01-21', day: 'Вс', dayNumber: '21' }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-6 pt-4">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Запись на услугу</Text>
          <Text className="text-gray-600 mb-6">Выберите дату и время</Text>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Выберите дату</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row space-x-3">
                {dates.map((item) => (
                  <TouchableOpacity
                    key={item.date}
                    onPress={() => setSelectedDate(item.date)}
                    className={`w-16 h-20 rounded-xl items-center justify-center ${
                      selectedDate === item.date ? 'bg-pink-500' : 'bg-gray-100'
                    }`}
                  >
                    <Text className={`text-sm font-medium ${
                      selectedDate === item.date ? 'text-white' : 'text-gray-600'
                    }`}>
                      {item.day}
                    </Text>
                    <Text className={`text-lg font-bold ${
                      selectedDate === item.date ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.dayNumber}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Выберите время</Text>
            <View className="flex-row flex-wrap gap-3">
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  className={`px-4 py-3 rounded-xl ${
                    selectedTime === time ? 'bg-pink-500' : 'bg-gray-100'
                  }`}
                >
                  <Text className={`font-medium ${
                    selectedTime === time ? 'text-white' : 'text-gray-700'
                  }`}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Контактная информация</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 mb-2">Имя</Text>
                <TextInput
                  className="bg-gray-100 rounded-xl px-4 py-3 text-gray-900"
                  placeholder="Введите ваше имя"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View>
                <Text className="text-gray-700 mb-2">Телефон</Text>
                <TextInput
                  className="bg-gray-100 rounded-xl px-4 py-3 text-gray-900"
                  placeholder="+7 (999) 123-45-67"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                />
              </View>
              <View>
                <Text className="text-gray-700 mb-2">Комментарий (необязательно)</Text>
                <TextInput
                  className="bg-gray-100 rounded-xl px-4 py-3 text-gray-900 h-20"
                  placeholder="Дополнительные пожелания"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity className="bg-pink-500 rounded-2xl py-4 mb-6">
            <Text className="text-white text-center text-lg font-semibold">
              Подтвердить запись
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;
