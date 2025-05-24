import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  ModalController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Notifications</ion-title>
        <ion-button fill="clear" slot="end" (click)="closeModal()">Close</ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list *ngIf="messages.length > 0; else noMessages">
        <ion-item
          *ngFor="let msg of messages"
          (click)="handleMessageClick(msg)"
          [detail]="true"
          [lines]="'full'"
        >
          <ion-label>
            <h3>{{ msg.title }}</h3>
            <p>{{ msg.description }}</p>
            <p class="timestamp">{{ msg.created | date:'dd.MM.yyyy HH:mm' }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ng-template #noMessages>
        <div class="empty-state">
          <p>You're all caught up!</p>
          <p>No new notifications.</p>
        </div>
      </ng-template>
    </ion-content>
  `,
  styles: [`
    .empty-state {
      text-align: center;
      margin-top: 50%;
      color: var(--ion-color-medium);
    }
    .timestamp {
      color: var(--ion-color-medium);
      font-size: 0.8rem;
      margin-top: 4px;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonLabel
  ]
})
export class InboxComponent implements OnInit {
  messages: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit(): void {
    const plugin = (window as any).cordova?.plugins?.brazePlugin;

    if (!plugin) {
      console.error('Braze plugin not available');
      return;
    }

    plugin.getContentCards(
      (data: any[]) => {
        this.messages = data.map(card => ({
          id: card.id,
          title: card.title,
          description: card.description,
          created: new Date(card.created * 1000),
          extras: card.extras
        }));
      },
      (err: any) => {
        console.error('Failed to fetch content cards:', err);
      }
    );
  }

  handleMessageClick(message: any): void {
    const plugin = (window as any).cordova?.plugins?.brazePlugin;
    if (plugin && message?.id) {
      plugin.logContentCardImpression(message.id);
    }

    this.modalCtrl.dismiss().then(() => {
      this.router.navigate(['/complete']);
    });
  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
