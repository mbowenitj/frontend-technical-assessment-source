import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-spinner',
  template: `<ion-grid>
    <ion-row col-md-8 offset-md-2>
      <ion-col class="ion-text-center">
        <ion-spinner
          [ngStyle]="{ 'width.rem': scale(), 'height.rem': scale() }"
          [color]="color()"
          [name]="name()"
        ></ion-spinner>
        <span><ng-content #info></ng-content> </span>
      </ion-col>
    </ion-row>
  </ion-grid> `,
  styles: [],
  imports: [CommonModule, IonGrid, IonRow, IonCol, IonSpinner],
  standalone: true
})
export class SpinnerComponent {
  color = input<IonSpinner['color']>('warning');
  name = input<IonSpinner['name']>('bubbles');
  scale = input(4);
}
