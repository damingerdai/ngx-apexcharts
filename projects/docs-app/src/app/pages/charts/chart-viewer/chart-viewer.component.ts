import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { map } from 'rxjs';
import { ComponentPageTitle } from '../../../shared/page-title/page-title';
import {
  CHART_CATEGORIES,
  ChartCategoryDoc,
  COMMON_CHART_API_INPUTS,
} from '../chart-examples.data';
import { ChartExampleViewerComponent } from '../chart-example-viewer/chart-example-viewer.component';

export type ChartDocTab = 'overview' | 'api' | 'examples';

@Component({
  selector: 'app-chart-viewer',
  standalone: true,
  imports: [
    MatTabsModule,
    RouterLink,
    RouterLinkActive,
    ChartExampleViewerComponent,
  ],
  templateUrl: './chart-viewer.component.html',
  styleUrl: './chart-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartViewerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageTitle = inject(ComponentPageTitle);
  private readonly document = inject(DOCUMENT);

  readonly sections: { id: ChartDocTab; label: string }[] = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'api', label: 'API' },
    { id: 'examples', label: 'EXAMPLES' },
  ];

  readonly commonApiInputs = COMMON_CHART_API_INPUTS;

  private readonly routeData = toSignal(
    this.route.data.pipe(
      map(data => ({
        categoryId: (data['categoryId'] as string) || 'line-charts',
        tab: (data['tab'] as ChartDocTab) || 'overview',
      })),
    ),
    { initialValue: { categoryId: 'line-charts', tab: 'overview' as ChartDocTab } },
  );

  readonly activeTab = computed(() => this.routeData().tab);

  readonly category = computed<ChartCategoryDoc>(() => {
    const id = this.routeData().categoryId;
    const found = CHART_CATEGORIES.find(item => item.id === id) ?? CHART_CATEGORIES[0];
    this.pageTitle.title = `${found.name} - Charts`;
    return found;
  });

  scrollToSection(anchorId: string, event: Event): void {
    event.preventDefault();
    const target = this.document.getElementById(anchorId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (typeof history !== 'undefined') {
      history.replaceState(null, '', `#${anchorId}`);
    }
  }
}
