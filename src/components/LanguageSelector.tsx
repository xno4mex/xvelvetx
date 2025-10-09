import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocale } from '../context/LocaleContext';
import { supportedLanguages, SupportedLanguage } from '../locales/i18n';

interface LanguageSelectorProps {
  style?: any;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style }) => {
  const { currentLanguage, setCurrentLanguage, t } = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  const languageData = Object.entries(supportedLanguages).map(([code, name]) => ({
    code: code as SupportedLanguage,
    name,
  }));

  const handleLanguageSelect = async (language: SupportedLanguage) => {
    await setCurrentLanguage(language);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={style}
        onPress={() => setIsVisible(true)}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
      >
        <View className="flex-row items-center">
          <Ionicons name="language" size={24} color="#8B5CF6" />
          <Text className="ml-3 text-gray-900 font-medium">
            {t('profile.language')}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-gray-600 mr-2">
            {supportedLanguages[currentLanguage]}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl max-h-96">
            <View className="p-4 border-b border-gray-200">
              <Text className="text-xl font-bold text-gray-900 text-center">
                {t('profile.selectLanguage')}
              </Text>
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setIsVisible(false)}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={languageData}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-row items-center justify-between p-4 border-b border-gray-100"
                  onPress={() => handleLanguageSelect(item.code)}
                >
                  <Text className="text-gray-900 font-medium text-lg">
                    {item.name}
                  </Text>
                  {currentLanguage === item.code && (
                    <Ionicons name="checkmark" size={24} color="#8B5CF6" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
