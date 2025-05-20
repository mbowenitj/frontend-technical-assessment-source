import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonIcon, IonText } from '@ionic/angular/standalone';
import { Color } from '@ionic/core';
import { addIcons } from 'ionicons';
import { informationCircleOutline, alertCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-message-block',
  templateUrl: './message-block.component.html',
  styleUrls: ['./message-block.component.scss'],
  imports: [CommonModule, IonIcon, IonText],
  standalone: true
})
export class MessageBlockComponent {
  displayType = input<'error' | 'info' | 'warning'>('error');
  showBackground = input(true);
  showContact = input(false);
  contrastBackground = input(false);
  hasBorder = input(true);
  class = input('');
  iconColor = input<Color>();
  icon = input<IonIcon>();
  textColor = input<Color>();

  constructor() {
    addIcons({ informationCircleOutline, alertCircleOutline });
  }
}
