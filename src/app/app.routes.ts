import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'complete',
    loadComponent: () => import('./complete/complete.page').then( m => m.CompletePage)
  }
];
