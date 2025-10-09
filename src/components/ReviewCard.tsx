import React from 'react';
import { View, Text, Image } from 'react-native';
import { Review } from '../types/database';
import { formatDate, getInitials } from '../utils';
import { Rating } from './Rating';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
      <View className="flex-row items-start mb-3">
        <View className="w-12 h-12 rounded-full bg-purple-100 items-center justify-center mr-3">
          {review.user?.avatar_url ? (
            <Image
              source={{ uri: review.user.avatar_url }}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <Text className="text-purple-600 font-bold text-lg">
              {getInitials(review.user?.full_name || 'Пользователь')}
            </Text>
          )}
        </View>

        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-800 mb-1">
            {review.user?.full_name || 'Пользователь'}
          </Text>
          <View className="flex-row items-center justify-between">
            <Rating value={review.rating} size={16} />
            <Text className="text-gray-400 text-xs">
              {formatDate(review.created_at)}
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-gray-700 leading-5">
        {review.comment}
      </Text>

      {review.service && (
        <View className="mt-3 pt-3 border-t border-gray-100">
          <Text className="text-gray-500 text-xs">
            Услуга: <Text className="text-gray-700 font-medium">{review.service.name}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};



