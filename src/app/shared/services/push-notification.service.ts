// push-notification.service.ts
import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  constructor() {
    this.initializeBraze();
  }

  private initializeBraze() {
    document.addEventListener('deviceready', async () => {
      console.log('✅ deviceready fired');
      await new Promise(res => setTimeout(res, 1000));

      if (!(window as any).cordova?.plugins?.brazePlugin) {
        console.error('❌ Braze plugin not ready');
        return;
      }

      try {
        (window as any).cordova.plugins.brazePlugin.initializeBrazeSDK();
        console.log('✅ Braze SDK initialized');
      } catch (err) {
        console.error('❌ Braze initialization error:', err);
      }
    }, false);
  }

  init() {
    PushNotifications.addListener('registration', (token) => {
      console.log('FCM token:', token.value);
      (window as any).cordova?.plugins?.brazePlugin?.setPushRegistrationToken(token.value);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      this.handleBrazePush(notification);
    });

    this.registerPush();
  }

  private handleBrazePush(notification: any) {
    try {
      console.log('Push notification received:', notification);
      // Request content cards refresh when notification is received
      (window as any).cordova?.plugins?.brazePlugin?.requestContentCardsRefresh();
      (window as any).cordova?.plugins?.brazePlugin?.requestImmediateDataFlush();
    } catch (err) {
      console.warn('Push handling error:', err);
    }
  }

  async registerPush(): Promise<void> {
    try {
      const { receive } = await PushNotifications.checkPermissions();

      if (receive === 'prompt') {
        await PushNotifications.requestPermissions();
      }

      if (receive === 'granted') {
        await PushNotifications.register();
      }
    } catch (err) {
      console.error('Push registration failed:', err);
    }
  }
}
