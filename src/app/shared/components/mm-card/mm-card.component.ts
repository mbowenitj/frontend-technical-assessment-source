import { Component, input } from '@angular/core';
import { ImageLoaderComponent } from '@components/image-loader/image-loader.component';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mm-card',
  template: ` <ion-card class="ion-no-padding">
    <ion-card-header>
      @if (title(); as title) {
      <ion-card-title>
        <div class="flex-row align-items-center">
          @if(showIcon()) {
          <div class="m-r-1">
            <app-image-loader
              src="assets/icon/mm-cc-logo.png"
              imageClass="iconize"
              maxWidth="30px"
              skeletonDiameter="30px"
              skeletonBorderRadius="30px"
            ></app-image-loader>
          </div>
          } {{ title }}
        </div>
      </ion-card-title>
      }
    </ion-card-header>

    <ion-card-content>
      <ng-content></ng-content>
    </ion-card-content>
  </ion-card>`,
  styles: [],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, ImageLoaderComponent]
})
export class MmCardComponent {
  title = input('Mama Money');
  showIcon = input(true);
}
