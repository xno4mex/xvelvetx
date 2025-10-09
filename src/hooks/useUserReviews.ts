import { useState, useEffect } from 'react';
import { ReviewService } from '../services/reviewService';
import { Review } from '../types/database';

export const useUserReviews = (userId: string | null) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await ReviewService.getUserReviews(userId);
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки отзывов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [userId]);

  const refresh = () => {
    fetchReviews();
  };

  return {
    reviews,
    loading,
    error,
    refresh,
  };
};


