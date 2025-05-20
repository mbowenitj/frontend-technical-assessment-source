import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-image-loader',
  template: `<img
      [src]="src()"
      [ngClass]="imageClass()"
      [ngStyle]="{ maxWidth: maxWidth() }"
      (load)="testSkeleton() ? '' : loaded.set(true)"
      [alt]="alt()"
      [hidden]="!loaded()"
    />
    @if (!loaded()) {
    <ion-skeleton-text
      [ngStyle]="{ height: skeletonDiameter(), width: skeletonDiameter(), borderRadius: skeletonBorderRadius() }"
      animated
    ></ion-skeleton-text>
    } `,
  styles: [
    `
      img,
      ion-skeleton-text {
        width: 100%;
        height: auto;
      }

      img {
        display: block;
      }
    `
  ],
  standalone: true,
  imports: [CommonModule, IonSkeletonText]
})
export class ImageLoaderComponent {
  src = input.required<string>();
  alt = input<string | null>();
  maxWidth = input<string | null>();
  skeletonDiameter = input<string | null>();
  skeletonBorderRadius = input<string>('0');
  testSkeleton = input<boolean>(false);
  imageClass = input<string>();

  loaded = signal(false);
}
