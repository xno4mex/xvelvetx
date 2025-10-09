import React, { useRef } from 'react';
import { TouchableOpacity, Text, Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BeautifulButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const BeautifulButton: React.FC<BeautifulButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getButtonClassName = () => {
    const baseStyles = 'rounded-2xl flex-row items-center justify-center';
    
    const sizeStyles = {
      small: 'px-4 py-2',
      medium: 'px-6 py-3',
      large: 'px-8 py-4'
    };

    const variantStyles = {
      primary: 'bg-purple-600 shadow-lg',
      secondary: 'bg-white shadow-md',
      outline: 'border-2 border-purple-600 bg-transparent',
      ghost: 'bg-transparent'
    };

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
      fullWidth ? 'w-full' : ''
    } ${disabled ? 'opacity-50' : ''}`;
  };

  const getTextClassName = () => {
    const sizeStyles = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    };

    const variantStyles = {
      primary: 'text-white font-semibold',
      secondary: 'text-gray-800 font-semibold',
      outline: 'text-purple-600 font-semibold',
      ghost: 'text-purple-600 font-medium'
    };

    return `${sizeStyles[size]} ${variantStyles[variant]}`;
  };

  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
        return '#1F2937';
      case 'outline':
      case 'ghost':
        return '#8B5CF6';
      default:
        return '#FFFFFF';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        className={getButtonClassName()}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <View className="flex-row items-center">
            <View className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
            <Text className={getTextClassName()}>Загрузка...</Text>
          </View>
        ) : (
          <View className="flex-row items-center">
            {icon && iconPosition === 'left' && (
              <Ionicons
                name={icon as any}
                size={getIconSize()}
                color={getIconColor()}
                style={{ marginRight: 8 }}
              />
            )}
            <Text className={getTextClassName()}>{title}</Text>
            {icon && iconPosition === 'right' && (
              <Ionicons
                name={icon as any}
                size={getIconSize()}
                color={getIconColor()}
                style={{ marginLeft: 8 }}
              />
            )}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BeautifulButton;
