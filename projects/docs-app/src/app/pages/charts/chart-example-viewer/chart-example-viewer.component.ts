import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartComponent } from 'ngx-apexcharts';
import {
  ChartExample,
  getExampleHtmlCode,
  getExampleScssCode,
  getExampleTsCode,
} from '../chart-examples.data';

@Component({
  selector: 'app-chart-example-viewer',
  standalone: true,
  imports: [
    ChartComponent,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  templateUrl: './chart-example-viewer.component.html',
  styleUrl: './chart-example-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartExampleViewerComponent {
  private readonly clipboard = inject(Clipboard);
  private readonly snackbar = inject(MatSnackBar);

  readonly example = input.required<ChartExample>();
  readonly defaultShowSource = input(false);

  readonly showSource = signal(false);
  readonly selectedTab = signal(0);

  readonly tabs = computed(() => {
    const ex = this.example();
    return [
      { label: 'HTML', code: getExampleHtmlCode(ex) },
      { label: 'TS', code: getExampleTsCode(ex) },
      { label: 'SCSS', code: getExampleScssCode(ex) },
    ];
  });

  toggleSourceView(): void {
    this.showSource.update(v => !v);
  }

  copyLink(): void {
    if (typeof location === 'undefined') {
      return;
    }
    const fullUrl = `${location.origin}${location.pathname}#${this.example().id}`;
    if (this.clipboard.copy(fullUrl)) {
      this.snackbar.open('Link copied', '', { duration: 2500 });
    } else {
      this.snackbar.open('Link copy failed. Please try again!', '', { duration: 2500 });
    }
  }

  copyCode(code: string): void {
    if (this.clipboard.copy(code)) {
      this.snackbar.open('Code copied', '', { duration: 2500 });
    } else {
      this.snackbar.open('Copy failed. Please try again!', '', { duration: 2500 });
    }
  }
}
