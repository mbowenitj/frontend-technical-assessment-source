import { Component } from '@angular/core';
import { Platform } from '@ionic/angular/standalone';
import { HeaderComponent } from '@components/header/header.component';
import { MmCardComponent } from '@components/mm-card/mm-card.component';
import { IonHeader, IonContent, IonButton } from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';

declare global {
  interface Window {
    cordova: any;
  }
}

@Component({
  selector: 'app-home',
  template: `
    <ion-header mode="ios" class="ion-no-border">
      <app-header [showInboxButton]="true"></app-header>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <app-mm-card title="Implementation Task">
        <p class="m-b-2">
          Implement functionality to send <strong>INBOX_MESSAGE_TEST</strong>
          custom event to Braze.
        </p>
        <p class="m-b-2">
          Braze will send a push notification back to inform the client that there is a new content card available.
        </p>
        <p><strong>Note:</strong> Push notifications may take awhile to arrive</p>
      </app-mm-card>

      <ion-button (click)="sendInboxTestEvent()" color="primary" expand="block" size="large" fill="solid" class="m-t-4">
        SEND TEST EVENT
      </ion-button>
    </ion-content>
  `,
  styles: [],
  standalone: true,
  imports: [IonHeader, IonContent, IonButton, HeaderComponent, MmCardComponent]
})
export class HomePage {
  private brazeReady = false;

  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.initializeBraze().catch((err) => console.warn('Braze init failed:', err));
  }

  private isNativePlatform(): boolean {
    return Capacitor.isNativePlatform() && !!window.cordova;
  }

  private async initializeBraze(): Promise<void> {
    await this.platform.ready();

    return new Promise<void>((resolve, reject) => {
      document.addEventListener(
        'deviceready',
        async () => {
          console.log('✅ deviceready fired');

          // Delay to allow plugin injection
          await new Promise(res => setTimeout(res, 300));

          if (!window.cordova?.plugins?.brazePlugin) {
            console.error('❌ Braze plugin not ready');
            reject('Braze plugin not ready');
            return;
          }

          try {
            window.cordova.plugins.brazePlugin.initializeBrazeSDK();
            this.brazeReady = true;
            console.log('✅ Braze SDK initialized');
            resolve();
          } catch (err) {
            console.error('❌ Braze initialization error:', err);
            reject(err);
          }
        },
        { once: true }
      );
    });
  }

  async sendInboxTestEvent() {
    if (!this.brazeReady) {
      console.warn('⚠️ Braze not ready - attempting to initialize');
      await this.initializeBraze().catch((err) => {
        console.error('❌ Braze still not ready after retry:', err);
      });
      if (!this.brazeReady) return;
    }

    try {
      await new Promise<void>((resolve, reject) => {
        window.cordova.plugins.brazePlugin.logCustomEvent(
          'INBOX_MESSAGE_TEST',
          {},
          () => {
            console.log('✅ Event sent successfully');
            window.cordova.plugins.brazePlugin.requestImmediateDataFlush();
            resolve();
          },
          (err: any) => {
            console.error('❌ Failed to send event:', err);
            reject(err);
          }
        );
      });
    } catch (err) {
      console.error('❌ Error while sending Braze event:', err);
    }
  }
}
