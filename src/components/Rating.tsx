import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface RatingProps {
  value: number;
  size?: number;
  editable?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  size = 20,
  editable = false,
  onChange,
  showValue = false,
}) => {
  const stars = [1, 2, 3, 4, 5];

  const handlePress = (rating: number) => {
    if (editable && onChange) {
      onChange(rating);
    }
  };

  return (
    <View className="flex-row items-center gap-1">
      {stars.map((star) => {
        const filled = star <= Math.round(value);
        const StarComponent = editable ? TouchableOpacity : View;

        return (
          <StarComponent
            key={star}
            onPress={() => handlePress(star)}
            disabled={!editable}
          >
            <Text style={{ fontSize: size }}>
              {filled ? '⭐' : '☆'}
            </Text>
          </StarComponent>
        );
      })}
      {showValue && (
        <Text className="ml-2 text-gray-600 font-medium">
          {value.toFixed(1)}
        </Text>
      )}
    </View>
  );
};



