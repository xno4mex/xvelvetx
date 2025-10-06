import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-6 pt-4">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-2xl font-bold text-gray-900">Добро пожаловать</Text>
              <Text className="text-gray-600">В салон красоты XVelvetX</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-pink-100 rounded-full items-center justify-center">
              <Ionicons name="notifications-outline" size={20} color="#EC4899" />
            </TouchableOpacity>
          </View>

          <View className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 mb-6">
            <Text className="text-white text-xl font-bold mb-2">Специальное предложение</Text>
            <Text className="text-pink-100 mb-4">Скидка 20% на все услуги до конца месяца</Text>
            <TouchableOpacity className="bg-white rounded-full py-3 px-6 self-start">
              <Text className="text-pink-600 font-semibold">Записаться</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-4">Популярные услуги</Text>
            <View className="flex-row flex-wrap gap-3">
              {['Маникюр', 'Педикюр', 'Массаж', 'Стрижка'].map((service, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[45%]"
                >
                  <View className="w-12 h-12 bg-pink-100 rounded-full items-center justify-center mb-3">
                    <Ionicons name="sparkles-outline" size={24} color="#EC4899" />
                  </View>
                  <Text className="font-semibold text-gray-900">{service}</Text>
                  <Text className="text-sm text-gray-500">от 1500₽</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-4">Быстрые действия</Text>
            <View className="space-y-3">
              <TouchableOpacity className="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4">
                  <Ionicons name="calendar-outline" size={20} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Мои записи</Text>
                  <Text className="text-gray-500">Просмотреть и изменить</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity className="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center">
                <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
                  <Ionicons name="star-outline" size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">Отзывы</Text>
                  <Text className="text-gray-500">Оставить отзыв</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
