import { Component, forwardRef, input, output } from '@angular/core';
import { InboxButtonComponent } from '@components/inbox-button/inbox-button.component';
import { IonToolbar, IonTitle, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  template: ` <ion-toolbar>
    @if (showBackButton()) {
    <ion-button class="back-btn" (click)="backEvent.emit()" fill="clear" slot="start">
      <ion-icon color="dark" name="arrow-back" slot="icon-only"></ion-icon>
    </ion-button>
    }
    <ion-title> {{ title() }} </ion-title>
    @if (showInboxButton()) {
    <app-inbox-button slot="end"></app-inbox-button>
    }
  </ion-toolbar>`,
  styles: [
    `
      ion-toolbar {
        --min-height: 4rem;
      }

      ion-button {
        font-size: 1.5rem;
      }
    `
  ],
  standalone: true,
  imports: [IonToolbar, IonTitle, forwardRef(() => InboxButtonComponent), IonButton, IonIcon]
})
export class HeaderComponent {
  title = input('Mama Money');
  showBackButton = input(false);
  showInboxButton = input(false);
  backEvent = output<void>();

  constructor() {
    addIcons({ arrowBack });
  }
}
