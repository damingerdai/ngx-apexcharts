import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  afterRender,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexMarkers,
  ApexNoData,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ApexForecastDataPoints,
  ApexOptions,
} from './apex-types';

import type ApexCharts from 'apexcharts';

@Directive({
  selector: '[apxChart]',
  standalone: true,
  exportAs: 'apxChart',
})
export class NgxApexchartsDirective {
  public chart = input<ApexChart>();

  public annotations = input<ApexAnnotations>();

  public colors = input<any[]>();

  public dataLabels = input<ApexDataLabels>();

  public series = input<ApexAxisChartSeries | ApexNonAxisChartSeries>();

  public stroke = input<ApexStroke>();

  public labels = input<string[]>();

  public legend = input<ApexLegend>();

  public markers = input<ApexMarkers>();

  public noData = input<ApexNoData>();

  public fill = input<ApexFill>();

  public tooltip = input<ApexTooltip>();

  public plotOptions = input<ApexPlotOptions>();

  public responsive = input<ApexResponsive[]>();

  public xaxis = input<ApexXAxis>();

  public yaxis = input<ApexYAxis | ApexYAxis[]>();

  public forecastDataPoints = input<ApexForecastDataPoints>();

  public grid = input<ApexGrid>();

  public states = input<ApexStates>();

  public title = input<ApexTitleSubtitle>();

  public subtitle = input<ApexTitleSubtitle>();

  public theme = input<ApexTheme>();

  public autoUpdateSeries = input<boolean>(true);

  private chartObj?: ApexCharts;
  private hasPendingLoad = signal<boolean>(false);
  private destroyRef = inject(DestroyRef);

  constructor(private el: ElementRef) {
    afterNextRender(async () => {
      this.hasPendingLoad.set(true);
      const ApexCharts = (await import('apexcharts')).default;
      const options = this.buildOptions();
      this.chartObj = new ApexCharts(this.el.nativeElement, options);
      window.ApexCharts = ApexCharts;
      await this.render();
      this.hasPendingLoad.set(false);
    });

    afterRender(async () => {
      if (this.hasPendingLoad()) {
        return;
      }
      this.hasPendingLoad.set(true);
      this.chartObj?.destroy();
      const ApexCharts = (await import('apexcharts')).default;
      const options = this.buildOptions();
      this.chartObj = new ApexCharts(this.el.nativeElement, options);
      await this.render();
      this.hasPendingLoad.set(false);
    });

    this.destroyRef.onDestroy(() => {
      this.chartObj?.destroy();
    });
  }

  render(): Promise<void> {
    if (this.chartObj) {
      return this.chartObj.render();
    }
    return Promise.resolve();
  }

  updateOptions(
    options: any,
    redrawPaths?: boolean,
    animate?: boolean,
    updateSyncedCharts?: boolean,
  ): Promise<void> | undefined {
    return this.chartObj?.updateOptions(
      options,
      redrawPaths,
      animate,
      updateSyncedCharts,
    );
  }

  updateSeries(
    newSeries: ApexAxisChartSeries | ApexNonAxisChartSeries,
    animate?: boolean,
  ): Promise<void> | undefined {
    return this.chartObj?.updateSeries(newSeries, animate);
  }

  appendSeries(
    newSeries: ApexAxisChartSeries | ApexNonAxisChartSeries,
    animate?: boolean,
  ): void {
    this.chartObj?.appendSeries(newSeries, animate);
  }

  appendData(newData: any[]): void {
    this.chartObj?.appendData(newData);
  }

  toggleSeries(seriesName: string): Promise<void> {
    return this.chartObj?.toggleSeries(seriesName);
  }

  showSeries(seriesName: string): void {
    this.chartObj?.showSeries(seriesName);
  }

  hideSeries(seriesName: string): void {
    this.chartObj?.hideSeries(seriesName);
  }

  resetSeries(): void {
    this.chartObj?.resetSeries();
  }

  zoomX(min: number, max: number): void {
    this.chartObj?.zoomX(min, max);
  }

  toggleDataPointSelection(seriesIndex: number, dataPointIndex?: number): void {
    this.chartObj?.toggleDataPointSelection(seriesIndex, dataPointIndex);
  }

  destroy(): void {
    this.chartObj?.destroy();
  }

  setLocale(localeName: string): void {
    this.chartObj?.setLocale(localeName);
  }

  paper(): void {
    this.chartObj?.paper();
  }

  addXaxisAnnotation(
    options: any,
    pushToMemory?: boolean,
    context?: any,
  ): void {
    this.chartObj?.addXaxisAnnotation(options, pushToMemory, context);
  }

  addYaxisAnnotation(
    options: any,
    pushToMemory?: boolean,
    context?: any,
  ): void {
    this.chartObj?.addYaxisAnnotation(options, pushToMemory, context);
  }

  addPointAnnotation(
    options: any,
    pushToMemory?: boolean,
    context?: any,
  ): void {
    this.chartObj?.addPointAnnotation(options, pushToMemory, context);
  }

  removeAnnotation(id: string, options?: any): void {
    this.chartObj?.removeAnnotation(id, options);
  }

  clearAnnotations(options?: any): void {
    this.chartObj?.clearAnnotations(options);
  }

  dataURI(
    options?: any,
  ): Promise<{ imgURI: string } | { blob: Blob }> | undefined {
    return this.chartObj?.dataURI(options);
  }

  private buildOptions(): ApexOptions {
    const options: ApexOptions = {};

    if (this.annotations()) {
      options.annotations = this.annotations();
    }
    if (this.chart()) {
      options.chart = this.chart();
    }
    if (this.colors()) {
      options.colors = this.colors();
    }
    if (this.dataLabels()) {
      options.dataLabels = this.dataLabels();
    }
    if (this.series()) {
      options.series = this.series();
    }
    if (this.stroke()) {
      options.stroke = this.stroke();
    }
    if (this.labels()) {
      options.labels = this.labels();
    }
    if (this.legend()) {
      options.legend = this.legend();
    }
    if (this.fill()) {
      options.fill = this.fill();
    }
    if (this.tooltip()) {
      options.tooltip = this.tooltip();
    }
    if (this.plotOptions()) {
      options.plotOptions = this.plotOptions();
    }
    if (this.responsive()) {
      options.responsive = this.responsive();
    }
    if (this.markers()) {
      options.markers = this.markers();
    }
    if (this.noData()) {
      options.noData = this.noData();
    }
    if (this.xaxis()) {
      options.xaxis = this.xaxis();
    }
    if (this.yaxis()) {
      options.yaxis = this.yaxis();
    }
    if (this.forecastDataPoints()) {
      options.forecastDataPoints = this.forecastDataPoints();
    }
    if (this.grid()) {
      options.grid = this.grid();
    }
    if (this.states()) {
      options.states = this.states();
    }
    if (this.title()) {
      options.title = this.title();
    }
    if (this.subtitle()) {
      options.subtitle = this.subtitle();
    }
    if (this.theme()) {
      options.theme = this.theme();
    }

    return options;
  }
}
