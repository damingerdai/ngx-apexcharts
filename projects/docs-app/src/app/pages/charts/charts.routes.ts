import { Routes } from '@angular/router';
import { ChartsComponent } from './charts.component';
import { ChartViewerComponent } from './chart-viewer/chart-viewer.component';
import { CHART_CATEGORIES } from './chart-examples.data';

const categoryRoutes: Routes = CHART_CATEGORIES.map(category => ({
  path: category.id,
  children: [
    {
      path: '',
      redirectTo: 'overview',
      pathMatch: 'full',
    },
    {
      path: 'overview',
      component: ChartViewerComponent,
      data: { categoryId: category.id, tab: 'overview' },
    },
    {
      path: 'api',
      component: ChartViewerComponent,
      data: { categoryId: category.id, tab: 'api' },
    },
    {
      path: 'examples',
      component: ChartViewerComponent,
      data: { categoryId: category.id, tab: 'examples' },
    },
  ],
}));

export const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    children: [
      {
        path: '',
        redirectTo: `${CHART_CATEGORIES[0].id}/overview`,
        pathMatch: 'full',
      },
      ...categoryRoutes,
    ],
  },
];
