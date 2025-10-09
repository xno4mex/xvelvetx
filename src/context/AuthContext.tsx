import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/database';
import { AuthService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем текущего пользователя при загрузке
    const getCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error getting current user:', error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();

    // Подписываемся на изменения состояния аутентификации
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await AuthService.signIn(email, password);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    setLoading(true);
    try {
      await AuthService.signUp(email, password, fullName, phone);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await AuthService.signOut();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const updatedUser = await AuthService.updateProfile(user.id, updates);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


