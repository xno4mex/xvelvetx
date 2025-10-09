import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useServicesWithTranslations } from '../hooks/useServicesWithTranslations';
import { useBookings } from '../hooks';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import { BeautifulInput, BeautifulButton, TimeSlotPicker, BookingCard } from '../components';
import { BookingService } from '../services/bookingService';
import { getDateString, addDays, getWeekdayName } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';

type BookingScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Booking'>;

const BookingScreen = ({ route }: any) => {
  const { user } = useAuth();
  const { getServiceById } = useServicesWithTranslations();
  const { bookings, refresh } = useBookings(user?.id || null);
  const navigation = useNavigation<BookingScreenNavigationProp>();
  const { t, currentLanguage } = useLocale();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  const [availableDates, setAvailableDates] = useState<any[]>([]);

  useEffect(() => {
    if (route?.params?.serviceId) {
      const service = getServiceById(route.params.serviceId);
      setSelectedService(service);
    }
    
    // Генерируем доступные даты на 7 дней вперед
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);
      dates.push({
        date: getDateString(date),
        day: getWeekdayName(date, currentLanguage).slice(0, 3),
        dayNumber: date.getDate().toString()
      });
    }
    setAvailableDates(dates);
  }, [route?.params?.serviceId, currentLanguage]);

  const handleCreateBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !user) {
      Alert.alert(t('common.error'), t('booking.fillAllFields'));
      return;
    }

    try {
      setLoading(true);
      await BookingService.createBooking({
        user_id: user.id,
        service_id: selectedService.id,
        booking_date: selectedDate,
        booking_time: selectedTime,
        notes: formData.comment,
      });
      
      Alert.alert(t('common.success'), t('booking.bookingSuccess'));
      refresh();
      setShowBookings(true);
    } catch (error) {
      Alert.alert(t('common.error'), t('booking.bookingError'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await BookingService.cancelBooking(bookingId);
      Alert.alert(t('common.success'), t('booking.cancelled'));
      refresh();
    } catch (error) {
      Alert.alert(t('common.error'), t('booking.cancelError'));
    }
  };

  if (showBookings) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="px-6 pt-4 pb-2">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-2xl font-bold text-gray-900">{t('booking.myBookings')}</Text>
            <TouchableOpacity onPress={() => setShowBookings(false)}>
              <Text className="text-purple-600 font-semibold">{t('booking.newBooking')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          data={bookings}
          renderItem={({ item }) => (
            <BookingCard
              booking={item}
              onCancel={() => handleCancelBooking(item.id)}
              showActions={true}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-6 pt-4">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {selectedService ? `${t('booking.title')} ${selectedService.name}` : t('booking.selectService')}
          </Text>
          <Text className="text-gray-600 mb-6">{t('booking.selectDateAndTime')}</Text>

          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-900 mb-6">{t('booking.selectDate')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row gap-4">
                {availableDates.map((item) => (
                  <TouchableOpacity
                    key={item.date}
                    onPress={() => setSelectedDate(item.date)}
                    className={`w-20 h-24 rounded-2xl items-center justify-center shadow-sm ${
                      selectedDate === item.date 
                        ? 'bg-purple-600 shadow-lg' 
                        : 'bg-white border border-gray-200'
                    }`}
                    activeOpacity={0.8}
                  >
                    <Text className={`text-sm font-medium mb-1 ${
                      selectedDate === item.date ? 'text-white' : 'text-gray-600'
                    }`}>
                      {item.day}
                    </Text>
                    <Text className={`text-xl font-bold ${
                      selectedDate === item.date ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.dayNumber}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {selectedService && selectedDate && (
            <TimeSlotPicker
              serviceId={selectedService.id}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          )}

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-6">{t('booking.additionalInfo')}</Text>
            <BeautifulInput
              label={t('booking.commentOptional')}
              placeholder={t('booking.additionalWishes')}
              value={formData.comment}
              onChangeText={(value) => setFormData(prev => ({ ...prev, comment: value }))}
              multiline
              numberOfLines={4}
              icon="chatbubble-outline"
            />
          </View>

          <View className="gap-3">
            <BeautifulButton
              title={loading ? t('booking.creating') : t('booking.confirmBooking')}
              onPress={handleCreateBooking}
              variant="primary"
              size="large"
              icon="checkmark-circle-outline"
              fullWidth
              disabled={loading || !selectedService || !selectedDate || !selectedTime}
            />
            
            <BeautifulButton
              title={t('booking.myBookings')}
              onPress={() => setShowBookings(true)}
              variant="outline"
              size="medium"
              icon="calendar-outline"
              fullWidth
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;
