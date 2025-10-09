import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Service } from '../types/database';
import { TranslatedService } from '../hooks/useServicesWithTranslations';
import { formatPrice, formatDuration } from '../utils/formatters';
import { useLocale } from '../context/LocaleContext';
import { Rating } from './Rating';

interface ServiceCardProps {
  service: Service | TranslatedService;
  onPress?: () => void;
  averageRating?: number;
  reviewCount?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onPress,
  averageRating = 0,
  reviewCount = 0,
}) => {
  const { currentLanguage } = useLocale();
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4"
    >
      {service.image_url && (
        <Image
          source={{ uri: service.image_url }}
          className="w-full h-48"
          resizeMode="cover"
        />
      )}
      
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-bold text-gray-800 flex-1">
            {service.name}
          </Text>
          <View className="bg-purple-100 px-3 py-1 rounded-full">
            <Text className="text-purple-700 font-semibold">
              {formatPrice(service.price)}
            </Text>
          </View>
        </View>

        <Text className="text-gray-600 mb-3" numberOfLines={2}>
          {service.description}
        </Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center">
              <Text className="text-gray-500">⏱️</Text>
              <Text className="text-gray-600 ml-1">
                {formatDuration(service.duration, currentLanguage)}
              </Text>
            </View>
            
            {reviewCount > 0 && (
              <View className="flex-row items-center gap-1">
                <Rating value={averageRating} size={16} showValue />
                <Text className="text-gray-500 text-xs">
                  ({reviewCount})
                </Text>
              </View>
            )}
          </View>

          <View className="bg-gray-100 px-3 py-1 rounded-full">
            <Text className="text-gray-600 text-xs font-medium">
              {service.category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};


