import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'guide',
    loadChildren: () => import('./pages/guide-viewer/guide-viewer.routes').then(r => r.routes)
  },
  {path: '**', redirectTo: '/guide'},
];
