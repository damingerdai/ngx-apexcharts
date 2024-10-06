import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'guide',
    loadComponent: () => import('./pages/guide-viewer/guide-viewer.component').then(m => m.GuideViewerComponent)
  },
  {path: '**', redirectTo: '/guide'},
];
