import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CHART_CATEGORIES } from '../../pages/charts/chart-examples.data';

@Component({
  selector: 'app-charts-nav',
  imports: [
    MatListModule,
    RouterModule,
  ],
  templateUrl: './charts-nav.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './charts-nav.component.scss',
})
export class ChartsNavComponent {
  protected readonly items = CHART_CATEGORIES.map(category => ({
    name: category.name,
    link: category.id,
  }));
}
