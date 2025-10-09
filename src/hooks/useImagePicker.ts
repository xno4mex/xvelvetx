import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { getErrorMessage, validateImageSize, isValidImageExtension } from '../utils';

interface UseImagePickerOptions {
  aspect?: [number, number];
  quality?: number;
  allowsEditing?: boolean;
  maxSize?: number;
}

interface UseImagePickerResult {
  pickImage: () => Promise<{ uri: string; base64: string } | null>;
  pickFromCamera: () => Promise<{ uri: string; base64: string } | null>;
  loading: boolean;
  error: string | null;
}

export const useImagePicker = (options?: UseImagePickerOptions): UseImagePickerResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultOptions = {
    aspect: [1, 1] as [number, number],
    quality: 0.8,
    allowsEditing: true,
    ...options,
  };

  const validateImage = async (uri: string): Promise<boolean> => {
    if (!isValidImageExtension(uri)) {
      setError('Неподдерживаемый формат файла. Используйте JPG или PNG');
      Alert.alert('Ошибка', 'Неподдерживаемый формат файла');
      return false;
    }

    const isValidSize = await validateImageSize(uri);
    if (!isValidSize) {
      setError('Размер файла слишком большой');
      Alert.alert('Ошибка', 'Размер файла не должен превышать 5MB');
      return false;
    }

    return true;
  };

  const pickImage = async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Ошибка', 'Необходимо разрешение на доступ к галерее');
        setError('Permission denied');
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: defaultOptions.allowsEditing,
        aspect: defaultOptions.aspect,
        quality: defaultOptions.quality,
        base64: true,
      });

      if (result.canceled || !result.assets[0]) {
        return null;
      }

      const { uri, base64 } = result.assets[0];

      const isValid = await validateImage(uri);
      if (!isValid || !base64) {
        return null;
      }

      return { uri, base64 };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      Alert.alert('Ошибка', message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const pickFromCamera = async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Ошибка', 'Необходимо разрешение на доступ к камере');
        setError('Permission denied');
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: defaultOptions.allowsEditing,
        aspect: defaultOptions.aspect,
        quality: defaultOptions.quality,
        base64: true,
      });

      if (result.canceled || !result.assets[0]) {
        return null;
      }

      const { uri, base64 } = result.assets[0];

      const isValid = await validateImage(uri);
      if (!isValid || !base64) {
        return null;
      }

      return { uri, base64 };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      Alert.alert('Ошибка', message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    pickImage,
    pickFromCamera,
    loading,
    error,
  };
};



