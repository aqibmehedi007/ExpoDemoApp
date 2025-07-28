import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export interface NotificationData {
  title: string;
  body: string;
  data?: any;
}

export class NotificationService {
  // Request permission to send notifications
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Notification permission denied');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  // Get the device's push token
  static async getPushToken(): Promise<string | null> {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: 'your-project-id', // This will be auto-detected in Expo
      });
      return token.data;
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  }

  // Send a local notification
  static async sendLocalNotification(notification: NotificationData): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  }

  // Send a scheduled notification
  static async sendScheduledNotification(
    notification: NotificationData,
    trigger: Notifications.NotificationTriggerInput
  ): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
        },
        trigger,
      });
    } catch (error) {
      console.error('Error sending scheduled notification:', error);
    }
  }

  // Send welcome notification when app first opens
  static async sendWelcomeNotification(): Promise<void> {
    await this.sendLocalNotification({
      title: 'Welcome! 👋',
      body: 'Thanks for using our app. Explore the characters and add your favorites!',
    });
  }

  // Send notification when item is added
  static async sendItemAddedNotification(itemName: string): Promise<void> {
    await this.sendLocalNotification({
      title: 'Item Added! ✅',
      body: `${itemName} has been added to your collection.`,
      data: { type: 'item_added', itemName },
    });
  }

  // Send test notification
  static async sendTestNotification(): Promise<void> {
    await this.sendLocalNotification({
      title: 'Test Notification 🧪',
      body: 'This is a test notification from your React Native app!',
      data: { type: 'test' },
    });
  }

  // Cancel all scheduled notifications
  static async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling notifications:', error);
    }
  }
} 