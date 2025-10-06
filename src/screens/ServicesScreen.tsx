import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const services = [
  {
    id: '1',
    name: 'Маникюр',
    price: '1500₽',
    duration: '60 мин',
    description: 'Классический маникюр с покрытием',
    icon: 'hand-left-outline',
    color: 'bg-pink-100',
    textColor: 'text-pink-600'
  },
  {
    id: '2',
    name: 'Педикюр',
    price: '2000₽',
    duration: '90 мин',
    description: 'Педикюр с обработкой стоп',
    icon: 'footsteps-outline',
    color: 'bg-purple-100',
    textColor: 'text-purple-600'
  },
  {
    id: '3',
    name: 'Массаж',
    price: '3000₽',
    duration: '60 мин',
    description: 'Расслабляющий массаж тела',
    icon: 'fitness-outline',
    color: 'bg-blue-100',
    textColor: 'text-blue-600'
  },
  {
    id: '4',
    name: 'Стрижка',
    price: '2500₽',
    duration: '45 мин',
    description: 'Стрижка и укладка волос',
    icon: 'cut-outline',
    color: 'bg-green-100',
    textColor: 'text-green-600'
  },
  {
    id: '5',
    name: 'Макияж',
    price: '4000₽',
    duration: '90 мин',
    description: 'Вечерний макияж',
    icon: 'eye-outline',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-600'
  },
  {
    id: '6',
    name: 'Брови',
    price: '1200₽',
    duration: '30 мин',
    description: 'Коррекция и окрашивание бровей',
    icon: 'eye-outline',
    color: 'bg-indigo-100',
    textColor: 'text-indigo-600'
  }
];

const ServicesScreen = () => {
  const renderService = ({ item }: { item: typeof services[0] }) => (
    <TouchableOpacity className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row items-start">
        <View className={`w-12 h-12 ${item.color} rounded-full items-center justify-center mr-4`}>
          <Ionicons name={item.icon as any} size={24} color={item.textColor.replace('text-', '#')} />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
            <Text className="text-lg font-bold text-pink-600">{item.price}</Text>
          </View>
          <Text className="text-gray-600 mb-2">{item.description}</Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="#9CA3AF" />
              <Text className="text-gray-500 ml-1">{item.duration}</Text>
            </View>
            <TouchableOpacity className="bg-pink-500 rounded-full px-4 py-2">
              <Text className="text-white font-semibold">Записаться</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Услуги</Text>
        <Text className="text-gray-600">Выберите услугу для записи</Text>
      </View>
      
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ServicesScreen;
