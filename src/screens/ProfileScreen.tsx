import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const menuItems = [
    { icon: 'person-outline', title: 'Личные данные', color: 'text-blue-600' },
    { icon: 'calendar-outline', title: 'Мои записи', color: 'text-green-600' },
    { icon: 'star-outline', title: 'Отзывы', color: 'text-yellow-600' },
    { icon: 'card-outline', title: 'Способы оплаты', color: 'text-purple-600' },
    { icon: 'notifications-outline', title: 'Уведомления', color: 'text-orange-600' },
    { icon: 'help-circle-outline', title: 'Помощь', color: 'text-gray-600' },
    { icon: 'settings-outline', title: 'Настройки', color: 'text-gray-600' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="px-6 pt-4">
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-pink-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="person" size={40} color="#EC4899" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-1">Анна Иванова</Text>
            <Text className="text-gray-600 mb-4">+7 (999) 123-45-67</Text>
            <TouchableOpacity className="bg-pink-500 rounded-full px-6 py-2">
              <Text className="text-white font-semibold">Редактировать профиль</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl p-6 mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">Статистика</Text>
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-2xl font-bold text-pink-600">12</Text>
                <Text className="text-gray-600 text-sm">Записей</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-pink-600">4.9</Text>
                <Text className="text-gray-600 text-sm">Рейтинг</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-pink-600">5</Text>
                <Text className="text-gray-600 text-sm">Отзывов</Text>
              </View>
            </View>
          </View>

          <View className="space-y-2">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-xl p-4 flex-row items-center"
              >
                <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4">
                  <Ionicons name={item.icon as any} size={20} color="#6B7280" />
                </View>
                <Text className="flex-1 text-gray-900 font-medium">{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity className="bg-red-50 rounded-xl p-4 flex-row items-center mt-6 mb-8">
            <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            </View>
            <Text className="flex-1 text-red-600 font-medium">Выйти из аккаунта</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
