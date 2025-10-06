import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-semibold text-slate-800">
        XVelvetX
      </Text>
      <Text className="text-base text-slate-500 mt-2">
        Beauty salon app starter
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
