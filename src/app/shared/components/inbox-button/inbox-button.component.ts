import { AfterViewInit, Component, OnInit, input, signal } from '@angular/core';
import { IonButton, IonIcon, IonAccordion, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { notificationsOutline } from 'ionicons/icons';
import anime, { AnimeInstance } from 'animejs';
import { InboxComponent } from '@components/inbox/inbox.component';
import { IonicModule } from '@ionic/angular';

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
  styles: [
    `
      ion-button {
        --padding-end: 0.5rem;
        --padding-start: 0.5rem;
        font-size: 1.75rem;
      }

      .notification-button {
        position: relative;
        svg {
          position: absolute;
          top: 30%;
          right: 25%;
          z-index: 99;
        }
      }
    `
  ],
  imports: [IonicModule],
  standalone: true
})
export class InboxButtonComponent implements AfterViewInit, OnInit {
  readonly slot = input<IonAccordion['toggleIconSlot']>();
  unreadMessages = signal(false);
  private shakeAnimation?: AnimeInstance;

  constructor(private modalCtrl: ModalController) {
    addIcons({ notificationsOutline });
  }

  async showInbox(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: InboxComponent,
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.5, 0.8, 1],
      showBackdrop: true,
      backdropDismiss: true
    });
    await modal.present();
  }

  ngOnInit(): void {
    const plugin = (window as any).cordova?.plugins?.brazePlugin;

    if (plugin) {
      plugin.getUnreadInboxMessagesCount(
        (count: number) => {
          if (count > 0) {
            this.unreadMessages.set(true);
            this.shakeAnimation?.restart();
          }
        },
        (err: any) => {
          console.error('Failed to get unread count:', err);
        }
      );
    }
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
