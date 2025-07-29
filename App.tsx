import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NotificationService } from './utils/notifications';
import { FirebaseService } from './utils/firebase';

// Import navigators
import BottomTabNavigator from './navigation/BottomTabNavigator';

// Import screens
import DetailsScreen from './screens/DetailsScreen';

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

    // Setup Firebase notifications
    const setupFirebase = async () => {
      try {
        // Request Firebase permission
        const hasFirebasePermission = await FirebaseService.requestUserPermission();
        if (hasFirebasePermission) {
          // Get FCM token
          const fcmToken = await FirebaseService.getFCMToken();
          if (fcmToken) {
            console.log('FCM Token:', fcmToken);
            // In a real app, you would send this token to your server
            // For demo purposes, we'll just log it
          }
        }
      } catch (error) {
        console.error('Firebase setup error:', error);
      }
    };

    setupNotifications();
    setupFirebase();

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

    // Listen for Firebase foreground messages
    const unsubscribeFirebase = FirebaseService.onMessage((remoteMessage) => {
      console.log('Firebase foreground message:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || 'New Message',
        remoteMessage.notification?.body || 'You have a new notification'
      );
    });

    // Listen for Firebase notification open events
    const unsubscribeFirebaseOpen = FirebaseService.onNotificationOpenedApp((remoteMessage) => {
      console.log('Firebase notification opened app:', remoteMessage);
      // Handle navigation based on notification data
    });

    // Check if app was opened from Firebase notification
    FirebaseService.getInitialNotification().then((remoteMessage) => {
      if (remoteMessage) {
        console.log('App opened from Firebase notification:', remoteMessage);
        // Handle initial notification
      }
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
      unsubscribeFirebase();
      unsubscribeFirebaseOpen();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="MainTabs"
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
          name="MainTabs" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Item Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
