import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import { BeautifulInput, BeautifulButton } from '../components';
import { validateEmail, validatePassword, validateFullName, validatePhone, getErrorMessage } from '../utils';

const RegisterScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { t } = useLocale();

  const handleRegister = async () => {
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      Alert.alert(t('common.error'), t('auth.fillAllFields'));
      return;
    }

    if (!validateFullName(fullName)) {
      Alert.alert(t('common.error'), t('auth.nameTooShort'));
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert(t('common.error'), t('auth.invalidEmail'));
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert(t('common.error'), t('auth.invalidPhone'));
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      Alert.alert(t('common.error'), passwordValidation.message);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('common.error'), t('auth.passwordsDoNotMatch'));
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password, fullName, phone);
      Alert.alert(
        t('common.success'),
        t('auth.registrationSuccess'),
        [{ text: t('common.ok'), onPress: () => navigation.navigate('Login') }]
      );
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
        contentContainerClassName="flex-grow justify-center px-6 py-8"
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-8">
          <Text className="text-4xl font-bold text-gray-800 mb-2">
            {t('auth.register')}
          </Text>
          <Text className="text-lg text-gray-500">
            {t('auth.createAccount')}
          </Text>
        </View>

        <View className="space-y-4 mb-8">
          <BeautifulInput
            placeholder={t('auth.fullName')}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <BeautifulInput
            placeholder={t('auth.email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <BeautifulInput
            placeholder={t('auth.phone')}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <BeautifulInput
            placeholder={t('auth.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <BeautifulInput
            placeholder={t('auth.confirmPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <BeautifulButton
          title={loading ? t('auth.registering') : t('auth.signUp')}
          onPress={handleRegister}
          disabled={loading}
        />

        {loading && (
          <View className="mt-4 items-center">
            <ActivityIndicator 
              size="large" 
              color="#8B5CF6" 
            />
            <Text className="text-gray-500 mt-2">{t('auth.creatingAccount')}</Text>
          </View>
        )}

        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-gray-600">
            {t('auth.hasAccount')}{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-purple-600 font-semibold">
              {t('auth.signIn')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

