import { supabase } from '../config/supabase';
import { Review, Service } from '../types/database';

export class ReviewService {
  static async createReview(reviewData: {
    user_id: string;
    service_id: string;
    booking_id: string;
    rating: number;
    comment: string;
  }): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select(`
        *,
        user:users(*),
        service:services(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }

  static async getServiceReviews(serviceId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:users(*),
        service:services(*)
      `)
      .eq('service_id', serviceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getUserReviews(userId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:users(*),
        service:services(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getServiceAverageRating(serviceId: string): Promise<number> {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('service_id', serviceId);

    if (error) throw error;
    
    if (!data || data.length === 0) return 0;
    
    const sum = data.reduce((acc, review) => acc + review.rating, 0);
    return sum / data.length;
  }

  static async updateReview(reviewId: string, updates: {
    rating?: number;
    comment?: string;
  }): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', reviewId)
      .select(`
        *,
        user:users(*),
        service:services(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteReview(reviewId: string): Promise<void> {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) throw error;
  }
}



