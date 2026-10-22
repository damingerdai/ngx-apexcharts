<p align="center">
  <img src="https://apexcharts.com/media/ng-apexcharts.png" height="150" alt="ngx-apexcharts" />
</p>

<p align="center">
  <a href="https://github.com/damingerdai/ngx-apexcharts/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg" alt="License"></a>
  <a href="https://www.npmjs.com/package/ngx-apexcharts"><img src="https://img.shields.io/npm/v/ngx-apexcharts.svg" alt="npm version"></a>
</p>

<p align="center">Modern Angular wrapper for <a href="https://github.com/apexcharts/apexcharts.js">ApexCharts</a> built with Standalone Components and Angular Signals.</p>

<p align="center"><a href="https://apexcharts.com/angular-chart-demos/"><img src="https://apexcharts.com/media/apexcharts-banner.png" alt="ApexCharts Banner"></a></p>

## Features

- **Standalone Component**: Import `ChartComponent` (or `NgxApexchartsModule`) directly into any standalone component.
- **Angular Signals Native**: Built with Signal-based `input()`, `output()`, `viewChild()`, and reactive `chartInstance` signal.
- **SSR Ready**: Lazily loads `apexcharts/client` in the browser after render, working out of the box with `@angular/ssr` and prerendering without extra `angular.json` script configuration.
- ** Angular Schematics**: Quick setup and automated version migrations via `ng add` and `ng update`.

## Download and Installation

### Option 1: Angular CLI Schematics (Recommended)

Use Angular CLI's [schematics](https://angular.dev/tools/cli/schematics) to install and configure `ngx-apexcharts` automatically:

```bash
ng add ngx-apexcharts
```

The `ng add` command will:
- Add `apexcharts` and `ngx-apexcharts` to `package.json` and install dependencies.
- Register `NgxApexchartsModule` in your root standalone component or `AppModule`.

### Option 2: Manual Installation

Install `apexcharts` and `ngx-apexcharts` via npm:

```bash
npm install apexcharts ngx-apexcharts --save
```

> **Note:** You do **not** need to add `apexcharts.min.js` to the `scripts` array in `angular.json`. `ngx-apexcharts` automatically loads ApexCharts on the client.

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
    // Updating the signal automatically updates the chart!
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

If your application still uses `NgModule`, import `NgxApexchartsModule`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

All inputs on `<apx-chart>` (`ChartComponent`) are defined using Angular's `input()` API:

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

// Emits when the underlying ApexCharts instance is initialized and rendered
readonly chartReady = output<{ chartObj: ApexCharts }>();

// Signal holding the underlying ApexCharts instance (or null before render)
readonly chartInstance = signal<ApexCharts | null>(null);
```

Visit the [ApexCharts Documentation](https://apexcharts.com/docs/) to read more about all available configuration options.

### Calling Core ApexCharts Methods

Updating your bound signals or properties will automatically update and re-render the chart. When you need imperative control over the chart, query `ChartComponent` using Angular's `viewChild()` signal query:

```html
<apx-chart #chartObj [series]="series()" [chart]="chart()" />
```

```ts
import { Component, computed, viewChild } from '@angular/core';
import { ChartComponent } from 'ngx-apexcharts';

export class MyChartComponent {
  readonly chart = viewChild.required<ChartComponent>('chartObj');

  // Optional: track the underlying ApexCharts instance reactively via computed() or effect()
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

### Calling ApexCharts Methods Globally by Chart ID

You can also invoke methods directly on `window.ApexCharts` by targeting the `chart.id` configured on your chart:

```ts
window.ApexCharts.exec('ngx-chart-example', 'updateSeries', [
  {
    data: [40, 55, 65, 11, 23, 44, 54, 33],
  },
]);
```

More info on `.exec()` can be found in the [ApexCharts `.exec()` documentation](https://apexcharts.com/docs/methods/#exec).

#### Turning Off Auto-Update of Series

With `[autoUpdateSeries]="false"`, you can control whether `<apx-chart>` calls `updateSeries()` automatically when only the `series` input changes. It defaults to `true`. In mixed/combo charts where `series[i].type` changes dynamically, set `[autoUpdateSeries]="false"` so the chart re-creates cleanly.

## License

`ngx-apexcharts` is released under the MIT license.

### Credits

Originally created by [Morris Janatzek](http://morrisj.net) and maintained for modern Angular.
