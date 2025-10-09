import { supabase } from '../config/supabase';
import { decode } from 'base64-arraybuffer';

class StorageService {
  static async uploadAvatar(
    userId: string,
    base64: string,
    fileExt: string = 'jpg'
  ): Promise<string> {
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const arrayBuffer = decode(base64);

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, arrayBuffer, {
        contentType: `image/${fileExt}`,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return publicUrl;
  }

  static async deleteAvatar(filePath: string): Promise<void> {
    const { error } = await supabase.storage
      .from('avatars')
      .remove([filePath]);

    if (error) {
      throw error;
    }
  }
}

export { StorageService };

