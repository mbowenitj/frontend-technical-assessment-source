import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonList } from '@ionic/angular';
import { CommonModule } from '@angular/common';

declare var cordova: any;

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Inbox</ion-title>
        <ion-button fill="clear" slot="end" (click)="closeModal()">Close</ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list *ngIf="messages.length > 0; else noMessages">
        <ion-item
          *ngFor="let msg of messages"
          (click)="markAsRead(msg)"
          [detail]="true"
          [lines]="'full'"
        >
          <ion-label>
            <h3>{{ msg.title }}</h3>
            <p>{{ msg.extras?.body || msg.extras?.summary }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ng-template #noMessages>
        <p>No messages available.</p>
      </ng-template>
    </ion-content>
  `
})
export class InboxComponent implements OnInit {
  messages: any[] = [];
  modal = inject(IonModal);

  ngOnInit(): void {
    const plugin = cordova?.plugins?.brazePlugin;

    if (!plugin) {
      console.error('Braze plugin not available');
      return;
    }

    plugin.getInboxMessages(
      (data: any[]) => {
        this.messages = data;
      },
      (err: any) => {
        console.error('Failed to fetch messages:', err);
      }
    );
  }

  markAsRead(message: any): void {
    const plugin = cordova?.plugins?.brazePlugin;
    if (plugin && message?.id) {
      plugin.setInboxMessageAsRead(message.id);
    }
    // Optionally close or refresh list
    this.closeModal();
  }

  closeModal(): void {
    this.modal.dismiss();
  }
}
