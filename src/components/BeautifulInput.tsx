import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BeautifulInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'numeric';
  multiline?: boolean;
  numberOfLines?: number;
  icon?: string;
  error?: string;
  disabled?: boolean;
}

const BeautifulInput: React.FC<BeautifulInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  icon,
  error,
  disabled = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', '#EC4899'],
  });

  const labelTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [16, -8],
  });

  const labelScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.85],
  });

  const labelColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#6B7280', '#EC4899'],
  });

  return (
    <View className="mb-4">
      <Animated.View
        style={{
          position: 'absolute',
          left: 16,
          zIndex: 10,
          transform: [
            { translateY: labelTranslateY },
            { scale: labelScale }
          ]
        }}
      >
        <Animated.Text
          style={{ 
            color: labelColor,
            fontSize: 14,
            fontWeight: '500',
            backgroundColor: 'white',
            paddingHorizontal: 8,
          }}
        >
          {label}
        </Animated.Text>
      </Animated.View>
      
      <Animated.View
        style={{
          backgroundColor: 'white',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 20,
          paddingTop: 24,
          borderColor: borderColor,
          borderWidth: 2,
          opacity: disabled ? 0.5 : 1,
          shadowColor: isFocused ? '#EC4899' : '#000',
          shadowOffset: { width: 0, height: isFocused ? 4 : 2 },
          shadowOpacity: isFocused ? 0.1 : 0.05,
          shadowRadius: isFocused ? 8 : 4,
          elevation: isFocused ? 8 : 2,
        }}
      >
        <View className="flex-row items-center">
          {icon && (
            <View className="mr-3">
              <Ionicons 
                name={icon as any} 
                size={20} 
                color={isFocused ? '#EC4899' : '#9CA3AF'} 
              />
            </View>
          )}
          
          <TextInput
            className={`flex-1 text-gray-900 text-base ${
              multiline ? 'min-h-[80px]' : 'h-6'
            }`}
            placeholder={isFocused || value ? placeholder : ''}
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry && !showPassword}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={multiline ? 'top' : 'center'}
            editable={!disabled}
          />
          
          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="ml-2"
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      
      {error && (
        <View className="flex-row items-center mt-2">
          <Ionicons name="alert-circle-outline" size={16} color="#EF4444" />
          <Text className="text-red-500 text-sm ml-1">{error}</Text>
        </View>
      )}
    </View>
  );
};

export default BeautifulInput;
