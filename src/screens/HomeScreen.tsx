import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useServicesWithTranslations, TranslatedService } from '../hooks/useServicesWithTranslations';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import { ServiceCard, BeautifulButton } from '../components';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';

type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

const HomeScreen = () => {
  const { user } = useAuth();
  const { services, loading } = useServicesWithTranslations();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useLocale();

  const popularServices = services.slice(0, 4);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-6 pt-4">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-2xl font-bold text-gray-900">
                {t('home.welcome')}{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
              </Text>
              <Text className="text-gray-600">{t('home.toSalon')}</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
              <Ionicons name="notifications-outline" size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>

          <View className="bg-purple-100 rounded-3xl p-6 mb-8 shadow-lg">
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-1">
                <Text className="text-purple-800 text-2xl font-bold mb-2">{t('home.specialOffer')}</Text>
                <Text className="text-purple-700 text-base leading-6">{t('home.discount')}</Text>
              </View>
              <View className="w-16 h-16 bg-purple-200 rounded-full items-center justify-center ml-4">
                <Ionicons name="gift" size={32} color="#7C3AED" />
              </View>
            </View>
            <BeautifulButton
              title={t('home.bookNow')}
              onPress={() => navigation.navigate('Services')}
              variant="primary"
              size="medium"
              icon="calendar-outline"
            />
          </View>

          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-2xl font-bold text-gray-900">{t('home.popularServices')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Services')}>
                <Text className="text-purple-600 font-semibold">{t('home.allServices')}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={popularServices}
              renderItem={({ item }: { item: TranslatedService }) => (
                <ServiceCard
                  service={item}
                  onPress={() => navigation.navigate('Booking')}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 24 }}
            />
          </View>

          <View className="mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-6">{t('home.quickActions')}</Text>
            <View className="gap-4">
              <TouchableOpacity 
                className="bg-white border border-gray-200 rounded-2xl p-5 flex-row items-center shadow-sm" 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Booking')}
              >
                <View className="w-12 h-12 bg-blue-100 rounded-2xl items-center justify-center mr-4">
                  <Ionicons name="calendar-outline" size={24} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-900 text-base">{t('home.myBookings')}</Text>
                  <Text className="text-gray-500 text-sm">{t('home.viewAndEdit')}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity 
                className="bg-white border border-gray-200 rounded-2xl p-5 flex-row items-center shadow-sm" 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Profile')}
              >
                <View className="w-12 h-12 bg-green-100 rounded-2xl items-center justify-center mr-4">
                  <Ionicons name="star-outline" size={24} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-900 text-base">{t('home.reviews')}</Text>
                  <Text className="text-gray-500 text-sm">{t('home.leaveReview')}</Text>
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
