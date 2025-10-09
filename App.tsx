import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { LocaleProvider } from './src/context/LocaleContext';
import { initializeI18n } from './src/locales/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import './global.css';

export default function App() {
  useEffect(() => {
    initializeI18n();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LocaleProvider>
          <ThemeProvider>
            <AuthProvider>
              <AppNavigator />
              <StatusBar style="auto" />
            </AuthProvider>
          </ThemeProvider>
        </LocaleProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
