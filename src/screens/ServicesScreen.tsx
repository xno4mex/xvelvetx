import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useServicesWithTranslations } from '../hooks/useServicesWithTranslations';
import { useLocale } from '../context/LocaleContext';
import { ServiceCard, BeautifulButton } from '../components';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';

type ServicesScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Services'>;

const ServicesScreen = () => {
  const { services, loading, getServicesByCategory, categories } = useServicesWithTranslations();
  const navigation = useNavigation<ServicesScreenNavigationProp>();
  const { t } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // "Все" / "All" etc.

  const filteredServices = selectedCategory === categories[0] 
    ? services 
    : getServicesByCategory(selectedCategory);

  const renderService = ({ item }: { item: any }) => (
    <ServiceCard
      service={item}
      onPress={() => navigation.navigate('Booking', { serviceId: item.id })}
    />
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item)}
      className={`px-4 py-2 rounded-full mr-3 ${
        selectedCategory === item 
          ? 'bg-purple-600' 
          : 'bg-gray-100'
      }`}
    >
      <Text className={`font-medium ${
        selectedCategory === item 
          ? 'text-white' 
          : 'text-gray-600'
      }`}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-4 pb-2">
        <Text className="text-3xl font-bold text-gray-900 mb-2">{t('services.title')}</Text>
        <Text className="text-gray-600 text-base">{t('services.selectService')}</Text>
      </View>
      
      <View className="px-6 mb-4">
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <FlatList
        data={filteredServices}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={() => {}}
      />
    </SafeAreaView>
  );
};

export default ServicesScreen;
