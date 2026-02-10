import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // is a special wrapper that enables advanced touch and gesture features (like swiping, dragging, and tapping) in the app

export default function TabLayout() {
  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}> 
    
      <Tabs
        screenOptions={{
          tabBarItemStyle: { paddingVertical: 10 },
          tabBarLabelStyle: { marginTop: 2, fontSize: 12, fontWeight: '600' },
          tabBarActiveTintColor: 'rgba(78, 4, 109, 1)',
          tabBarInactiveTintColor: 'rgba(113, 113, 113, 1)',
        }}
      >
        <Tabs.Screen
        name="account"
        options={{
          title: 'الحساب',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons size={17} name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="home"
        options={{
          title: 'الرئيسية',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons size={17} name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="settings"
        options={{
          title: 'الإعدادات',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons size={17} name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
      </Tabs>
    </GestureHandlerRootView>
    
  );
}
