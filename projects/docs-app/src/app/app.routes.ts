import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/homepage/homepage').then(m => m.HomepageComponent)
  },
  {
    path: 'guide',
    loadChildren: () => import('./pages/guide-viewer/guide-viewer.routes').then(r => r.routes)
  },
   {
    path: 'charts',
    loadChildren: () => import('./pages/charts/charts.routes').then(r => r.routes)
  },
  {path: '**', redirectTo: '/guide'},
];
