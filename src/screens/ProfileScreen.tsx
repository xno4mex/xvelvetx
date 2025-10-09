import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useBookings, useUserReviews } from '../hooks';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import { AvatarPicker, BeautifulButton, LanguageSelector } from '../components';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';

type ProfileScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Profile'>;

const ProfileScreen = () => {
  const { user, signOut, updateProfile } = useAuth();
  const { bookings } = useBookings(user?.id || null);
  const { reviews } = useUserReviews(user?.id || null);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { t } = useLocale();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

  const menuItems = [
    { icon: 'calendar-outline', title: t('profile.myBookings'), color: 'text-green-600', onPress: () => navigation.navigate('Booking') },
    { icon: 'star-outline', title: t('profile.reviews'), color: 'text-yellow-600', onPress: () => {} },
    { icon: 'card-outline', title: t('profile.paymentMethods'), color: 'text-purple-600', onPress: () => {} },
    { icon: 'notifications-outline', title: t('profile.notifications'), color: 'text-orange-600', onPress: () => {} },
    { icon: 'help-circle-outline', title: t('profile.help'), color: 'text-gray-600', onPress: () => {} },
    { icon: 'settings-outline', title: t('profile.settings'), color: 'text-gray-600', onPress: () => {} },
  ];

  const handleSignOut = () => {
    Alert.alert(
      t('profile.logoutConfirm'),
      t('profile.logoutConfirm'),
      [
        { text: t('profile.logoutCancel'), style: 'cancel' },
        { text: t('auth.signOut'), style: 'destructive', onPress: signOut }
      ]
    );
  };

  const handleAvatarUpload = async (url: string) => {
    setIsUpdatingAvatar(true);
    try {
      await updateProfile({ avatar_url: url });
    } catch (error) {
      Alert.alert(t('common.error'), t('profile.avatarUpdateError'));
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="px-6 pt-4">
          <View className="items-center mb-8">
            <AvatarPicker
              currentAvatarUrl={user?.avatar_url}
              userId={user?.id || ''}
              onUploadSuccess={handleAvatarUpload}
              size={96}
            />
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              {user?.full_name || t('common.user')}
            </Text>
            <Text className="text-gray-600 mb-4">{user?.phone || t('common.phoneNotSet')}</Text>
            <TouchableOpacity 
              className="bg-purple-600 rounded-full px-6 py-2"
              onPress={() => setIsEditing(!isEditing)}
            >
              <Text className="text-white font-semibold">
                {isEditing ? t('profile.save') : t('profile.edit')}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl p-6 mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">{t('profile.statistics')}</Text>
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">{bookings.length}</Text>
                <Text className="text-gray-600 text-sm">{t('common.bookings')}</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">
                  {reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0'}
                </Text>
                <Text className="text-gray-600 text-sm">{t('common.rating')}</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">{reviews.length}</Text>
                <Text className="text-gray-600 text-sm">{t('common.reviews')}</Text>
              </View>
            </View>
          </View>

          <View className="mb-4">
            <LanguageSelector />
          </View>

          <View className="gap-2">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-xl p-4 flex-row items-center"
                onPress={item.onPress}
              >
                <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4">
                  <Ionicons name={item.icon as any} size={20} color="#6B7280" />
                </View>
                <Text className="flex-1 text-gray-900 font-medium">{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            className="bg-red-50 rounded-xl p-4 flex-row items-center mt-6 mb-8"
            onPress={handleSignOut}
          >
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
