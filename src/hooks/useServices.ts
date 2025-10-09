import { useState, useEffect } from 'react';
import { Service } from '../types/database';
import { BookingService } from '../services/bookingService';
import { getErrorMessage } from '../utils';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await BookingService.getServices();
      setServices(data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getServiceById = (id: string): Service | undefined => {
    return services.find((service) => service.id === id);
  };

  const getServicesByCategory = (category: string): Service[] => {
    return services.filter((service) => service.category === category);
  };

  const refresh = () => {
    fetchServices();
  };

  return {
    services,
    loading,
    error,
    refresh,
    getServiceById,
    getServicesByCategory,
  };
};



