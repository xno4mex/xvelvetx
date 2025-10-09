import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StorageService } from '../services';
import { getErrorMessage, AVATAR_MAX_SIZE } from '../utils';
import { useLocale } from '../context/LocaleContext';

interface AvatarPickerProps {
  currentAvatarUrl?: string;
  userId: string;
  onUploadSuccess?: (url: string) => void;
  size?: number;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  currentAvatarUrl,
  userId,
  onUploadSuccess,
  size = 100,
}) => {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(currentAvatarUrl);
  const { t } = useLocale();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Ошибка', 'Необходимо разрешение на доступ к галерее');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      await uploadImage(result.assets[0].uri, result.assets[0].base64 || undefined);
    }
  };

  const uploadImage = async (uri: string, base64?: string) => {
    if (!base64) {
      Alert.alert('Ошибка', 'Не удалось получить изображение. Попробуйте выбрать другое фото.');
      return;
    }

    try {
      setUploading(true);
      
      const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpg';
      const url = await StorageService.uploadAvatar(userId, base64, fileExt);
      
      setAvatarUrl(url);
      onUploadSuccess?.(url);
    } catch (error) {
      Alert.alert('Ошибка', getErrorMessage(error));
    } finally {
      setUploading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      disabled={uploading}
      className="items-center"
    >
      <View
        style={{ width: size, height: size }}
        className="rounded-full bg-gray-200 items-center justify-center overflow-hidden border-2 border-gray-300"
      >
        {uploading ? (
          <ActivityIndicator size="large" color="#8B5CF6" />
        ) : avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={{ width: size, height: size }}
            className="rounded-full"
          />
        ) : (
          <Text className="text-4xl text-gray-400">👤</Text>
        )}
      </View>
      <Text className="text-purple-600 mt-2 font-medium">
        {uploading ? t('common.loading') : t('profile.changePhoto')}
      </Text>
    </TouchableOpacity>
  );
};


