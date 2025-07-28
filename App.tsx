import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NotificationService } from './utils/notifications';

// Import screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import FormScreen from './screens/FormScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // Request notification permissions on app start
    const setupNotifications = async () => {
      const hasPermission = await NotificationService.requestPermissions();
      if (hasPermission) {
        // Send welcome notification
        await NotificationService.sendWelcomeNotification();
      }
    };

    setupNotifications();

    // Listen for notifications when app is in foreground
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Listen for notification responses (when user taps notification)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
      // Handle notification tap - could navigate to specific screen
      const data = response.notification.request.content.data;
      if (data?.type === 'item_added') {
        // Could navigate to the item that was added
        console.log('User tapped on item added notification');
      }
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Assessment App' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Item Details' }}
        />
        <Stack.Screen 
          name="Form" 
          component={FormScreen} 
          options={{ title: 'Add Item' }}
        />
        <Stack.Screen 
          name="PrivacyPolicy" 
          component={PrivacyPolicyScreen} 
          options={{ title: 'Privacy Policy' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
