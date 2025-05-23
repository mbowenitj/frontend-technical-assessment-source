import { Injectable, OnInit } from '@angular/core';
import { PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications';

declare var cordova: any;

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
    // Increase delay – try 1000ms instead of 300ms to be sure
    await new Promise(res => setTimeout(res, 1000));

    console.log('Cordova:', cordova);
    console.log('Plugins:', cordova?.plugins);
    console.log('Braze plugin:', cordova?.plugins?.brazePlugin);

    if (!cordova?.plugins?.brazePlugin) {
      console.error('❌ Braze plugin not ready');
      return;
    }

    try {
      cordova.plugins.brazePlugin.initializeBrazeSDK();
      console.log('✅ Braze SDK initialized');
    } catch (err) {
      console.error('❌ Braze initialization error:', err);
    }
  }, false);
}



  init() {
    // 3. Set up push listeners
    PushNotifications.addListener('registration', (token) => {
      console.log('FCM token:', token.value);
      // Register token with Braze
      cordova?.plugins?.brazePlugin?.setPushRegistrationToken(token.value);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      this.handleBrazePush(notification);
    });

    this.registerPush();
  }

  private handleBrazePush(notification: any) {
    try {
      const extras = JSON.parse(notification?.data?.extra || '{}');

      if (extras.type === 'inbox') {
        console.log('Braze inbox push received');
        // Refresh cards and force sync
        cordova.plugins.brazePlugin.requestContentCardsRefresh();
        cordova.plugins.brazePlugin.requestImmediateDataFlush();
      }
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
