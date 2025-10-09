import * as FileSystem from 'expo-file-system';
import { AVATAR_MAX_SIZE } from './constants';

export const convertImageToBase64 = async (uri: string): Promise<string | null> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

export const getImageSize = async (uri: string): Promise<number> => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    return info.exists ? info.size : 0;
  } catch (error) {
    console.error('Error getting image size:', error);
    return 0;
  }
};

export const validateImageSize = async (uri: string): Promise<boolean> => {
  const size = await getImageSize(uri);
  return size <= AVATAR_MAX_SIZE;
};

export const getFileExtension = (uri: string): string => {
  const parts = uri.split('.');
  return parts[parts.length - 1].toLowerCase();
};

export const isValidImageExtension = (uri: string): boolean => {
  const validExtensions = ['jpg', 'jpeg', 'png'];
  const ext = getFileExtension(uri);
  return validExtensions.includes(ext);
};



