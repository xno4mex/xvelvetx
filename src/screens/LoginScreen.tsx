import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import { BeautifulInput, BeautifulButton } from '../components';
import { validateEmail, getErrorMessage } from '../utils';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { t } = useLocale();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('common.error'), t('auth.fillAllFields'));
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert(t('common.error'), t('auth.invalidEmail'));
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error) {
      Alert.alert(t('common.error'), getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView 
        contentContainerClassName="flex-grow justify-center px-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-12">
          <Text className="text-4xl font-bold text-gray-800 mb-2">
            {t('auth.welcome')}
          </Text>
          <Text className="text-lg text-gray-500">
            {t('auth.signInToAccount')}
          </Text>
        </View>

        <View className="space-y-4 mb-8">
          <BeautifulInput
            placeholder={t('auth.email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <BeautifulInput
            placeholder={t('auth.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <BeautifulButton
          title={loading ? t('common.loading') : t('auth.signIn')}
          onPress={handleLogin}
          disabled={loading}
        />

        {loading && (
          <View className="mt-4 items-center">
            <ActivityIndicator 
              size="large" 
              color="#8B5CF6" 
            />
            <Text className="text-gray-500 mt-2">{t('auth.signingIn')}</Text>
          </View>
        )}

        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-gray-600">
            {t('auth.noAccount')}{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-purple-600 font-semibold">
              {t('auth.signUp')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

