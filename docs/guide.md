## Download and Installation

### Option 1: Angular CLI Schematics (Recommended)

Use the Angular CLI's install [schematics](https://angular.dev/tools/cli/schematics) to set up `ngx-apexcharts` automatically:

```bash
ng add ngx-apexcharts
```

### Option 2: Manual Installation

Install `apexcharts` and `ngx-apexcharts` using npm:

```bash
npm install apexcharts ngx-apexcharts --save
```

> **Note:** You do **not** need to add `apexcharts.min.js` to the `scripts` array in `angular.json`. `ngx-apexcharts` lazily loads ApexCharts on the client and works out of the box with Angular SSR.

## Usage

### Standalone Component with Angular Signals (Recommended)

Import `ChartComponent` (or `NgxApexchartsModule`) directly into your standalone component and bind chart options using Angular Signals:

```ts
import { Component, signal, viewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ngx-apexcharts';

@Component({
  selector: 'app-chart-demo',
  standalone: true,
  imports: [ChartComponent],
  template: `
    <apx-chart
      #chartObj
      [series]="series()"
      [chart]="chart()"
      [xaxis]="xaxis()"
      [title]="title()"
      (chartReady)="onChartReady($event)"
    />
  `,
})
export class ChartDemoComponent {
  readonly chartRef = viewChild.required<ChartComponent>('chartObj');

  readonly series = signal<ApexAxisChartSeries>([
    {
      name: 'Sales',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ]);

  readonly chart = signal<ApexChart>({
    height: 350,
    type: 'line',
  });

  readonly xaxis = signal<ApexXAxis>({
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  });

  readonly title = signal<ApexTitleSubtitle>({
    text: 'Monthly Sales Trend',
  });

  updateData(): void {
    this.series.set([
      {
        name: 'Sales',
        data: [25, 50, 42, 68, 55, 80, 74, 95, 130],
      },
    ]);
  }

  onChartReady(event: { chartObj: unknown }): void {
    console.log('ApexCharts instance ready:', event.chartObj);
  }
}
```

### Using with `NgModule` (Legacy Support)

If your application uses `NgModule`, import `NgxApexchartsModule`:

```ts
import { NgxApexchartsModule } from 'ngx-apexcharts';

@NgModule({
  imports: [
    BrowserModule,
    NgxApexchartsModule,
  ],
})
export class AppModule {}
```

### Inputs & Outputs

All options of `<apx-chart>` (`ChartComponent`) are Signal-based `input()` bindings:

```ts
readonly chart = input<ApexChart>();
readonly annotations = input<ApexAnnotations>();
readonly colors = input<any[]>();
readonly dataLabels = input<ApexDataLabels>();
readonly series = input<ApexAxisChartSeries | ApexNonAxisChartSeries>();
readonly stroke = input<ApexStroke>();
readonly labels = input<string[]>();
readonly legend = input<ApexLegend>();
readonly markers = input<ApexMarkers>();
readonly noData = input<ApexNoData>();
readonly parsing = input<ApexParsing>();
readonly fill = input<ApexFill>();
readonly tooltip = input<ApexTooltip>();
readonly plotOptions = input<ApexPlotOptions>();
readonly responsive = input<ApexResponsive[]>();
readonly xaxis = input<ApexXAxis>();
readonly yaxis = input<ApexYAxis | ApexYAxis[]>();
readonly forecastDataPoints = input<ApexForecastDataPoints>();
readonly grid = input<ApexGrid>();
readonly states = input<ApexStates>();
readonly title = input<ApexTitleSubtitle>();
readonly subtitle = input<ApexTitleSubtitle>();
readonly theme = input<ApexTheme>();
readonly autoUpdateSeries = input<boolean>(true);

readonly chartReady = output<{ chartObj: ApexCharts }>();
readonly chartInstance = signal<ApexCharts | null>(null);
```

You can visit the [ApexCharts docs](https://apexcharts.com/docs/) to read more about all the options listed above.

### Updating the Chart

Updating your bound signals or properties will automatically invoke the relevant update methods of ApexCharts and re-render the chart.

### Calling Core ApexCharts Methods

When you need to call ApexCharts instance methods imperatively, query `ChartComponent` using Angular's `viewChild()` signal query:

```html
<apx-chart #chartObj [series]="series()" [chart]="chart()" />
```

```ts
import { Component, computed, viewChild } from '@angular/core';
import { ChartComponent } from 'ngx-apexcharts';

export class MyChartComponent {
  readonly chart = viewChild.required<ChartComponent>('chartObj');

  // Optional: track the underlying ApexCharts instance reactively
  readonly rawApexInstance = computed(() => this.chart().chartInstance());

  toggleFirstSeries(): void {
    this.chart().toggleSeries('Series 1');
  }
}
```

| Method | Description |
| --- | --- |
| <a href="https://apexcharts.com/docs/methods/#updateSeries">updateSeries</a> | Updates the series array, overriding the existing one. |
| <a href="https://apexcharts.com/docs/methods/#updateOptions">updateOptions</a> | Merges new configuration options into the existing chart. |
| <a href="https://apexcharts.com/docs/methods/#appendSeries">appendSeries</a> | Appends a new series to the chart. |
| <a href="https://apexcharts.com/docs/methods/#appendData">appendData</a> | Appends new data points to existing series arrays. |
| <a href="https://apexcharts.com/docs/methods/#toggleSeries">toggleSeries</a> | Toggles the visibility of a series programmatically. |
| <a href="https://apexcharts.com/docs/methods/#showSeries">showSeries</a> / <a href="https://apexcharts.com/docs/methods/#hideSeries">hideSeries</a> | Explicitly shows or hides a series by name. |
| <a href="https://apexcharts.com/docs/methods/#resetSeries">resetSeries</a> | Resets the chart series to its initial state. |
| <a href="https://apexcharts.com/docs/methods/#zoomX">zoomX</a> | Zooms the X-axis between `min` and `max` timestamps/indices. |
| <a href="https://apexcharts.com/docs/methods/#addxaxisannotation">addXaxisAnnotation</a> | Draws an X-axis annotation after the chart is rendered. |
| <a href="https://apexcharts.com/docs/methods/#addyaxisannotation">addYaxisAnnotation</a> | Draws a Y-axis annotation after the chart is rendered. |
| <a href="https://apexcharts.com/docs/methods/#addpointannotation">addPointAnnotation</a> | Draws a point (`xy`) annotation after the chart is rendered. |
| <a href="https://apexcharts.com/docs/methods/#clearAnnotations">clearAnnotations</a> / `removeAnnotation` | Clears all annotations or removes a specific annotation by ID. |
| <a href="https://apexcharts.com/docs/methods/#dataURI">dataURI</a> | Exports the rendered chart to a base64 data URI. |

## Calling ApexCharts Methods Without Referencing the Component

You can also call methods on the global `window.ApexCharts` object by targeting the configured `chart.id`:

```ts
window.ApexCharts.exec('ngx-chart-example', 'updateSeries', [
  {
    data: [40, 55, 65, 11, 23, 44, 54, 33],
  },
]);
```

More info on the `.exec()` method can be found [here](https://apexcharts.com/docs/methods/#exec).

#### Turning Off Auto-Update of Series

With `[autoUpdateSeries]="false"`, you can control whether `<apx-chart>` calls `updateSeries()` automatically when only the `series` input changes. It is `true` by default, but in a mixed/combo chart where `series[i].type` changes dynamically, set `[autoUpdateSeries]="false"` so the entire chart re-renders cleanly.
