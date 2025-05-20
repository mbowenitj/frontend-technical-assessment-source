import { Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { Router } from '@angular/router';
import { IonHeader, IonContent, IonButton } from '@ionic/angular/standalone';
import { MmCardComponent } from '@components/mm-card/mm-card.component';

@Component({
  selector: 'app-complete',
  template: `
    <ion-header mode="ios" class="ion-no-border">
      <app-header [showBackButton]="true" [showInboxButton]="true" (backEvent)="navigateBack()"></app-header>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <app-mm-card title="Assessment Complete!">
        <p class="m-b-2">Congratulations on completing the Mama Money Frontend Technical Assessment!</p>
        <p class="m-b-2">We value your feedback and would appreciate your thoughts on the assessment experience.</p>
        <p>
          <i><strong>Note:</strong> Providing feedback is optional but greatly appreciated</i>
        </p>
      </app-mm-card>

      <ion-button (click)="openSurvey()" color="secondary" expand="block" size="large" fill="solid" class="m-t-4">
        Share Your Feedback
      </ion-button>
    </ion-content>
  `,
  styles: [],
  standalone: true,
  imports: [IonHeader, IonContent, IonButton, HeaderComponent, MmCardComponent]
})
export class CompletePage {
  constructor(private readonly router: Router) {}

  navigateBack(): void {
    this.router.navigate(['/']);
  }

  openSurvey(): void {
    window.open('https://forms.gle/UazsbVmJx215Litc9', '_blank');
  }
}
