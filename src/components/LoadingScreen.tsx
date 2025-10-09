import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Загрузка...', 
  showLogo = true 
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9333EA', '#7C3AED', '#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {showLogo && (
            <>
              <View style={styles.logoContainer}>
                <Text style={styles.logo}>💅</Text>
              </View>
              <Text style={styles.title}>xVelvetx</Text>
            </>
          )}
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    fontSize: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  message: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default LoadingScreen;
