import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export class FirebaseService {
  // Request permission for push notifications
  static async requestUserPermission(): Promise<boolean> {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    return enabled;
  }

  // Get FCM token for this device
  static async getFCMToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  // Listen for FCM token refresh
  static onTokenRefresh(callback: (token: string) => void): () => void {
    return messaging().onTokenRefresh(callback);
  }

  // Handle foreground messages
  static onMessage(callback: (message: any) => void): () => void {
    return messaging().onMessage(callback);
  }

  // Handle background messages
  static setBackgroundMessageHandler(handler: (message: any) => Promise<void>): void {
    messaging().setBackgroundMessageHandler(handler);
  }

  // Handle notification open events
  static onNotificationOpenedApp(callback: (message: any) => void): () => void {
    return messaging().onNotificationOpenedApp(callback);
  }

  // Get initial notification (when app is opened from notification)
  static async getInitialNotification(): Promise<any> {
    return await messaging().getInitialNotification();
  }

  // Check if app was opened from notification
  static async hasPermission(): Promise<boolean> {
    const authStatus = await messaging().hasPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED;
  }
}

// Set up background message handler
FirebaseService.setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  // Handle background message here
  // You can show a local notification or update app state
}); 