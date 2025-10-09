import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BeautifulButton } from '../components';
import { useLocale } from '../context/LocaleContext';

const WelcomeScreen = ({ navigation }: any) => {
  const { t } = useLocale();
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9333EA', '#7C3AED', '#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/lotus.png')} style={styles.logoImage} resizeMode="contain" />
            </View>
            <Text style={styles.title}>{t('app.name')}</Text>
            <Text style={styles.subtitle}>{t('app.tagline')}</Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>📅</Text>
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{t('welcome.easyBooking')}</Text>
                <Text style={styles.featureDescription}>{t('welcome.easyBookingDesc')}</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>⭐</Text>
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{t('welcome.reviews')}</Text>
                <Text style={styles.featureDescription}>{t('welcome.reviewsDesc')}</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>🔔</Text>
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{t('welcome.notifications')}</Text>
                <Text style={styles.featureDescription}>{t('welcome.notificationsDesc')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <BeautifulButton
                title={t('welcome.signIn')}
                onPress={() => navigation.navigate('Login')}
                fullWidth
              />
            </View>
            
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerButtonText}>{t('welcome.getStarted')}</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 64,
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  logo: {
    fontSize: 56,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  featuresContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  featureIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  buttonsContainer: {
    gap: 16,
  },
  buttonWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  registerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WelcomeScreen;

