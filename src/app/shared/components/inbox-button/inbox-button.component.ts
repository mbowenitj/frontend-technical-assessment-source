import { AfterViewInit, Component, inject, input, signal } from '@angular/core';
import { IonButton, IonIcon, IonAccordion } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notificationsOutline } from 'ionicons/icons';
import anime, { AnimeInstance } from 'animejs';
import { PushNotificationService } from '../../services/push-notification.service'

@Component({
  selector: 'app-inbox-button',
  template: `
    <div class="notification-button">
      @if (unreadMessages()) {
        <svg class="notification-button-unread" height="10" width="10" xmlns="http://www.w3.org/2000/svg">
          <circle r="4.5" cx="5" cy="5" fill="red" />
        </svg>
      }
      <ion-button class="bell" [slot]="slot()" fill="clear" (click)="showInbox()">
        <ion-icon color="dark" slot="icon-only" name="notifications-outline"></ion-icon>
      </ion-button>
    </div>
  `,
  styles: [/* (unchanged styles) */],
  imports: [IonButton, IonIcon],
  standalone: true
})
export class InboxButtonComponent implements AfterViewInit {
  readonly slot = input<IonAccordion['toggleIconSlot']>();
  unreadMessages = signal(false);
  private shakeAnimation?: AnimeInstance;
  private pushNotificationService = inject(PushNotificationService);

  constructor() {
    addIcons({ notificationsOutline });

    // Subscribe to inbox updates
    this.pushNotificationService.getInboxUpdates().subscribe(cards => {
      const hasUnread = cards.some(c => !c.viewed); // Or use your Braze flag
      this.unreadMessages.set(hasUnread);
      if (hasUnread) {
        this.shakeAnimation?.restart();
      }
    });
  }

  showInbox(): void {
    // Open the inbox modal or navigate
    console.log('Inbox icon clicked');
  }

  ngAfterViewInit(): void {
    this.shakeAnimation = anime({
      targets: '.bell',
      translateX: [
        { value: -5, duration: 50 },
        { value: 5, duration: 50 },
        { value: -5, duration: 50 },
        { value: 5, duration: 50 },
        { value: -5, duration: 50 },
        { value: 5, duration: 50 },
        { value: -5, duration: 50 },
        { value: 5, duration: 50 },
        { value: 0, duration: 50 }
      ],
      easing: 'easeInOutSine',
      duration: 2000,
      autoplay: false
    });
  }
}
