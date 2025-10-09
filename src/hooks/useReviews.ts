import { useState, useEffect } from 'react';
import { Review } from '../types/database';
import { ReviewService } from '../services/reviewService';
import { subscribeToServiceReviews, unsubscribeChannel } from '../utils/realtimeHelpers';
import { getErrorMessage } from '../utils';

export const useServiceReviews = (serviceId: string | null) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) {
      setReviews([]);
      setAverageRating(0);
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const [reviewsData, rating] = await Promise.all([
          ReviewService.getServiceReviews(serviceId),
          ReviewService.getServiceAverageRating(serviceId),
        ]);
        setReviews(reviewsData);
        setAverageRating(rating);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    const channel = subscribeToServiceReviews(
      serviceId,
      (newReview) => {
        setReviews((prev) => [newReview, ...prev]);
        recalculateRating([newReview, ...reviews]);
      },
      (updatedReview) => {
        setReviews((prev) =>
          prev.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          )
        );
        recalculateRating(
          reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          )
        );
      },
      (deletedId) => {
        const updated = reviews.filter((review) => review.id !== deletedId);
        setReviews(updated);
        recalculateRating(updated);
      }
    );

    return () => {
      unsubscribeChannel(channel);
    };
  }, [serviceId]);

  const recalculateRating = (reviewsList: Review[]) => {
    if (reviewsList.length === 0) {
      setAverageRating(0);
      return;
    }

    const sum = reviewsList.reduce((acc, review) => acc + review.rating, 0);
    setAverageRating(sum / reviewsList.length);
  };

  const refresh = async () => {
    if (!serviceId) return;

    try {
      setLoading(true);
      const [reviewsData, rating] = await Promise.all([
        ReviewService.getServiceReviews(serviceId),
        ReviewService.getServiceAverageRating(serviceId),
      ]);
      setReviews(reviewsData);
      setAverageRating(rating);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return { reviews, averageRating, loading, error, refresh };
};

export const useUserReviews = (userId: string | null) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setReviews([]);
      setLoading(false);
      return;
    }

    fetchReviews();
  }, [userId]);

  const fetchReviews = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await ReviewService.getUserReviews(userId);
      setReviews(data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchReviews();
  };

  return { reviews, loading, error, refresh };
};



