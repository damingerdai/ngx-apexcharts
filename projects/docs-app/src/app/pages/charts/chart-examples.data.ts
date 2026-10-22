import { ApexOptions } from 'ngx-apexcharts';

export interface ChartApiProperty {
  name: string;
  type: string;
  description: string;
}

export interface ChartExample {
  id: string;
  sectionTitle: string;
  title: string;
  description: string;
  selectorName: string;
  componentName: string;
  options: Partial<ApexOptions>;
  htmlCode?: string;
  tsCode?: string;
  scssCode?: string;
}

export interface ChartCategoryDoc {
  id: string;
  name: string;
  summary: string;
  overview: string[];
  apiProperties: ChartApiProperty[];
  examples: ChartExample[];
}

function formatTsValue(val: unknown, indent = 4): string {
  const json = JSON.stringify(val, null, 2);
  if (!json) {
    return 'undefined';
  }
  const pad = ' '.repeat(indent);
  return json
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : pad + line))
    .join('\n');
}

export function getExampleHtmlCode(example: ChartExample): string {
  if (example.htmlCode) {
    return example.htmlCode;
  }
  const opts = example.options;
  const bindings: string[] = [];
  const keys: (keyof ApexOptions)[] = [
    'series',
    'chart',
    'xaxis',
    'yaxis',
    'stroke',
    'dataLabels',
    'plotOptions',
    'fill',
    'labels',
    'markers',
    'colors',
    'legend',
    'tooltip',
    'grid',
    'title',
    'subtitle',
    'annotations',
    'responsive',
    'theme',
  ];

  for (const key of keys) {
    if (opts[key] !== undefined) {
      bindings.push(`    [${key}]="chartOptions.${key}!"`);
    }
  }

  return `<div class="chart-box">\n  <apx-chart\n${bindings.join('\n')}\n  ></apx-chart>\n</div>`;
}

export function getExampleTsCode(example: ChartExample): string {
  if (example.tsCode) {
    return example.tsCode;
  }
  return `import { Component } from '@angular/core';
import { ChartComponent, ApexOptions } from 'ngx-apexcharts';

@Component({
  selector: 'app-${example.selectorName}',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './${example.selectorName}.component.html',
  styleUrl: './${example.selectorName}.component.scss',
})
export class ${example.componentName} {
  public chartOptions: Partial<ApexOptions> = ${formatTsValue(example.options, 2)};
}`;
}

export function getExampleScssCode(example: ChartExample): string {
  if (example.scssCode) {
    return example.scssCode;
  }
  return `.chart-box {
  max-width: 100%;
  margin: 0 auto;
}`;
}

export const COMMON_CHART_API_INPUTS: ChartApiProperty[] = [
  {
    name: '@Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries',
    type: 'ApexAxisChartSeries | ApexNonAxisChartSeries',
    description:
      'The data series array to render. Axis charts accept objects with name and data; non-axis charts (pie, donut, radialBar) accept a numeric array.',
  },
  {
    name: '@Input() chart: ApexChart',
    type: 'ApexChart',
    description:
      'Core chart configuration including type, height, width, animations, toolbar, zoom, stacked mode, and dropShadow.',
  },
  {
    name: '@Input() xaxis: ApexXAxis',
    type: 'ApexXAxis',
    description:
      'X-axis configuration including categories, type ("category" | "datetime" | "numeric"), labels, and axis borders.',
  },
  {
    name: '@Input() yaxis: ApexYAxis | ApexYAxis[]',
    type: 'ApexYAxis | ApexYAxis[]',
    description:
      'Single or multiple Y-axis definitions with min/max bounds, label formatters, and opposite axis positioning.',
  },
  {
    name: '@Input() plotOptions: ApexPlotOptions',
    type: 'ApexPlotOptions',
    description:
      'Chart-type specific configuration options for bar, pie, radialBar, radar, candlestick, heatmap, and treemap charts.',
  },
  {
    name: '@Input() dataLabels: ApexDataLabels',
    type: 'ApexDataLabels',
    description:
      'Controls visibility, formatting, offset, and styling of value labels directly on data points or bars.',
  },
  {
    name: '@Input() stroke: ApexStroke',
    type: 'ApexStroke',
    description:
      'Line and border stroke configuration including curve ("smooth" | "straight" | "stepline"), width, colors, and dashArray.',
  },
  {
    name: '@Input() fill: ApexFill',
    type: 'ApexFill',
    description:
      'Fill styling for areas, bars, and slices ("solid" | "gradient" | "pattern") along with gradient stops and opacity.',
  },
  {
    name: '@Input() legend: ApexLegend',
    type: 'ApexLegend',
    description:
      'Configures legend placement ("top" | "right" | "bottom" | "left"), alignment, markers, and interactive series toggling.',
  },
  {
    name: '@Input() tooltip: ApexTooltip',
    type: 'ApexTooltip',
    description:
      'Hover tooltip behavior including shared multi-series tooltips, custom value formatters, and theme.',
  },
  {
    name: '@Input() autoUpdateSeries: boolean',
    type: 'boolean',
    description:
      'When true (default), changes to the [series] input automatically invoke updateSeries() without recreating the chart.',
  },
  {
    name: '@Output() chartReady: EventEmitter<{ chartObj: ApexCharts }>',
    type: 'OutputEmitterRef<{ chartObj: ApexCharts }>',
    description:
      'Emits once the underlying ApexCharts instance has been created and rendered in the browser.',
  },
];

export const CHART_CATEGORIES: ChartCategoryDoc[] = [
  {
    id: 'line-charts',
    name: 'Line Charts',
    summary: 'Visualize continuous trends, time-series metrics, and multi-series comparisons over intervals.',
    overview: [
      '<code>&lt;apx-chart&gt;</code> with <code>chart.type = "line"</code> renders interactive SVG line charts ideal for tracking continuous data over time or ordered categories.',
      'Line charts support straight, smooth spline, and stepline curves via <code>[stroke]</code>, point annotations via <code>[annotations]</code>, and multi-series comparisons with synchronized tooltips.',
    ],
    apiProperties: [
      {
        name: 'stroke.curve',
        type: "'smooth' | 'straight' | 'stepline' | 'monotoneCubic'",
        description: 'Controls how points are connected along the line path.',
      },
      {
        name: 'stroke.dashArray',
        type: 'number | number[]',
        description: 'Creates dashed or dotted strokes per series for forecasts or targets.',
      },
      {
        name: 'markers.size',
        type: 'number | number[]',
        description: 'Radius of data point markers displayed along each line series.',
      },
    ],
    examples: [
      {
        id: 'basic-line-chart',
        sectionTitle: 'Basic line chart',
        title: 'Basic Line Chart',
        description:
          'A foundational single-series line chart binding <code>[series]</code>, <code>[chart]</code>, and <code>[xaxis]</code> categories with a subtle row grid.',
        selectorName: 'line-basic-example',
        componentName: 'LineBasicExampleComponent',
        options: {
          series: [
            {
              name: 'Desktops',
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
            },
          ],
          chart: {
            height: 340,
            type: 'line',
            zoom: { enabled: false },
            toolbar: { show: false },
          },
          colors: ['#d81b60'],
          dataLabels: { enabled: false },
          stroke: { curve: 'straight', width: 3 },
          title: { text: 'Product Trends by Month', align: 'left' },
          grid: {
            row: {
              colors: ['#f8fafc', 'transparent'],
              opacity: 0.6,
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          },
        },
      },
      {
        id: 'line-with-data-labels',
        sectionTitle: 'Line chart with data labels',
        title: 'Line Chart with Data Labels & Smooth Curve',
        description:
          'Enable <code>dataLabels.enabled = true</code> and set <code>stroke.curve = "smooth"</code> to display exact values directly above each marker on a multi-series chart.',
        selectorName: 'line-data-labels-example',
        componentName: 'LineDataLabelsExampleComponent',
        options: {
          series: [
            {
              name: 'High - 2026',
              data: [28, 29, 33, 36, 32, 32, 33],
            },
            {
              name: 'Low - 2026',
              data: [12, 11, 14, 18, 17, 13, 13],
            },
          ],
          chart: {
            height: 340,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 12,
              left: 5,
              blur: 8,
              opacity: 0.15,
            },
            toolbar: { show: false },
          },
          colors: ['#e91e63', '#546e7a'],
          dataLabels: { enabled: true },
          stroke: { curve: 'smooth', width: 3 },
          title: { text: 'Average High & Low Temperature', align: 'left' },
          markers: { size: 4 },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: { text: 'Month' },
          },
          yaxis: {
            title: { text: 'Temperature (°C)' },
            min: 5,
            max: 40,
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
          },
        },
      },
      {
        id: 'dashed-line-chart',
        sectionTitle: 'Dashed & stepline styles',
        title: 'Multi-Series Dashed Line Chart',
        description:
          'Combine solid and dashed lines by passing an array to <code>stroke.dashArray</code>—useful when comparing actual metrics against forecasted targets.',
        selectorName: 'line-dashed-example',
        componentName: 'LineDashedExampleComponent',
        options: {
          series: [
            {
              name: 'Session Duration',
              data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
            },
            {
              name: 'Page Views',
              data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
            },
            {
              name: 'Total Visits (Forecast)',
              data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
            },
          ],
          chart: {
            height: 340,
            type: 'line',
            zoom: { enabled: false },
            toolbar: { show: false },
          },
          colors: ['#d81b60', '#1e88e5', '#43a047'],
          dataLabels: { enabled: false },
          stroke: {
            width: [3, 3, 3],
            curve: 'straight',
            dashArray: [0, 8, 5],
          },
          title: { text: 'Page Engagement Statistics', align: 'left' },
          xaxis: {
            categories: [
              '01 Jan',
              '02 Jan',
              '03 Jan',
              '04 Jan',
              '05 Jan',
              '06 Jan',
              '07 Jan',
              '08 Jan',
              '09 Jan',
              '10 Jan',
              '11 Jan',
              '12 Jan',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'area-charts',
    name: 'Area Charts',
    summary: 'Emphasize volume and cumulative magnitude beneath time-series curves with gradient or stacked fills.',
    overview: [
      'Area charts extend line charts by filling the region between the stroke path and the axis baseline. Configure <code>chart.type = "area"</code> and customize gradients with <code>[fill]</code>.',
      'Use <code>chart.stacked = true</code> to visualize how individual series contribute to a cumulative total over time.',
    ],
    apiProperties: [
      {
        name: 'fill.type',
        type: "'solid' | 'gradient' | 'pattern'",
        description: 'Specifies how the area under the curve is shaded.',
      },
      {
        name: 'fill.gradient',
        type: 'ApexFillGradient',
        description: 'Controls gradient shadeIntensity, opacityFrom, opacityTo, and stops.',
      },
      {
        name: 'chart.stacked',
        type: 'boolean',
        description: 'Stacks multiple area series on top of each other to show cumulative totals.',
      },
    ],
    examples: [
      {
        id: 'spline-area-chart',
        sectionTitle: 'Spline area chart',
        title: 'Smooth Spline Area Chart',
        description:
          'Pairs <code>stroke.curve = "smooth"</code> with a vertical gradient fill to compare two overlapping time-series metrics.',
        selectorName: 'area-spline-example',
        componentName: 'AreaSplineExampleComponent',
        options: {
          series: [
            {
              name: 'Revenue',
              data: [31, 40, 28, 51, 42, 109, 100],
            },
            {
              name: 'Subscriptions',
              data: [11, 32, 45, 32, 34, 52, 41],
            },
          ],
          chart: {
            height: 340,
            type: 'area',
            toolbar: { show: false },
          },
          colors: ['#d81b60', '#3949ab'],
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth', width: 2 },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.45,
              opacityTo: 0.05,
              stops: [0, 90, 100],
            },
          },
          xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
        },
      },
      {
        id: 'stacked-area-chart',
        sectionTitle: 'Stacked area chart',
        title: 'Stacked Traffic Channels Area Chart',
        description:
          'Enable <code>chart.stacked = true</code> to stack multiple series and inspect cumulative growth across channels.',
        selectorName: 'area-stacked-example',
        componentName: 'AreaStackedExampleComponent',
        options: {
          series: [
            {
              name: 'Organic Search',
              data: [30, 40, 45, 50, 49, 60, 70, 91],
            },
            {
              name: 'Direct Traffic',
              data: [20, 29, 37, 36, 44, 45, 50, 58],
            },
            {
              name: 'Referral',
              data: [10, 15, 21, 25, 28, 32, 38, 42],
            },
          ],
          chart: {
            height: 340,
            type: 'area',
            stacked: true,
            toolbar: { show: false },
          },
          colors: ['#e91e63', '#00acc1', '#7cb342'],
          dataLabels: { enabled: false },
          stroke: { curve: 'monotoneCubic', width: 2 },
          fill: {
            type: 'gradient',
            gradient: {
              opacityFrom: 0.6,
              opacityTo: 0.8,
            },
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
          },
          xaxis: {
            categories: ['Q1 23', 'Q2 23', 'Q3 23', 'Q4 23', 'Q1 24', 'Q2 24', 'Q3 24', 'Q4 24'],
          },
        },
      },
    ],
  },
  {
    id: 'column-charts',
    name: 'Column Charts',
    summary: 'Compare discrete values across categories using vertical bars, grouped clusters, or stacked columns.',
    overview: [
      'Vertical column charts use <code>chart.type = "bar"</code> with <code>plotOptions.bar.horizontal = false</code> (default). They are suited for side-by-side category comparisons and periodic breakdowns.',
      'Customize column width, rounded corners (<code>borderRadius</code>), and per-bar distributed palettes via <code>[plotOptions]</code>.',
    ],
    apiProperties: [
      {
        name: 'plotOptions.bar.columnWidth',
        type: 'string',
        description: 'Percentage width of columns relative to available category slot (e.g., "55%").',
      },
      {
        name: 'plotOptions.bar.borderRadius',
        type: 'number',
        description: 'Rounds the top corners of vertical columns.',
      },
      {
        name: 'plotOptions.bar.distributed',
        type: 'boolean',
        description: 'Assigns a distinct color from [colors] to each individual column in a single series.',
      },
    ],
    examples: [
      {
        id: 'basic-column-chart',
        sectionTitle: 'Grouped column chart',
        title: 'Multi-Series Grouped Column Chart',
        description:
          'Compare multiple metrics side by side across categories with rounded column corners and formatted tooltips.',
        selectorName: 'column-basic-example',
        componentName: 'ColumnBasicExampleComponent',
        options: {
          series: [
            {
              name: 'Net Profit',
              data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
            {
              name: 'Revenue',
              data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
            {
              name: 'Free Cash Flow',
              data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false },
          },
          colors: ['#d81b60', '#3949ab', '#00897b'],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              borderRadius: 5,
            },
          },
          dataLabels: { enabled: false },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          },
          yaxis: {
            title: { text: '$ (thousands)' },
          },
          fill: { opacity: 1 },
        },
      },
      {
        id: 'stacked-column-chart',
        sectionTitle: 'Stacked column chart',
        title: 'Stacked Quarterly Breakdown Column Chart',
        description:
          'Set <code>chart.stacked = true</code> on a bar chart to stack category segments vertically with a interactive legend.',
        selectorName: 'column-stacked-example',
        componentName: 'ColumnStackedExampleComponent',
        options: {
          series: [
            {
              name: 'Product A',
              data: [44, 55, 41, 67, 22, 43],
            },
            {
              name: 'Product B',
              data: [13, 23, 20, 8, 13, 27],
            },
            {
              name: 'Product C',
              data: [11, 17, 15, 15, 21, 14],
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: { show: false },
          },
          colors: ['#e91e63', '#5c6bc0', '#26a69a'],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%',
              borderRadius: 4,
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          },
          legend: {
            position: 'top',
          },
          fill: { opacity: 1 },
        },
      },
      {
        id: 'distributed-column-chart',
        sectionTitle: 'Distributed column colors',
        title: 'Distributed Palette Column Chart',
        description:
          'When <code>plotOptions.bar.distributed = true</code>, each column automatically receives its own color from the <code>[colors]</code> palette.',
        selectorName: 'column-distributed-example',
        componentName: 'ColumnDistributedExampleComponent',
        options: {
          series: [
            {
              name: 'Score',
              data: [21, 22, 10, 28, 16, 21, 13, 30],
            },
          ],
          chart: {
            height: 340,
            type: 'bar',
            toolbar: { show: false },
          },
          colors: [
            '#d81b60',
            '#8e24aa',
            '#3949ab',
            '#1e88e5',
            '#00897b',
            '#43a047',
            '#fb8c00',
            '#e53935',
          ],
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
              borderRadius: 6,
            },
          },
          dataLabels: { enabled: false },
          legend: { show: false },
          xaxis: {
            categories: [
              'John',
              'Joe',
              'Jake',
              'Amber',
              'Peter',
              'Mary',
              'David',
              'Lily',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'bar-charts',
    name: 'Bar Charts',
    summary: 'Display rankings, survey results, and long category labels clearly with horizontal bars.',
    overview: [
      'Horizontal bar charts are configured by setting <code>chart.type = "bar"</code> and <code>plotOptions.bar.horizontal = true</code>.',
      'They are ideal when category names are long or when presenting ranked leaderboards and stacked progress breakdowns.',
    ],
    apiProperties: [
      {
        name: 'plotOptions.bar.horizontal',
        type: 'boolean',
        description: 'Renders bars horizontally along the X-axis when set to true.',
      },
      {
        name: 'plotOptions.bar.barHeight',
        type: 'string',
        description: 'Height of horizontal bars as a percentage of the row height (e.g., "70%").',
      },
    ],
    examples: [
      {
        id: 'basic-horizontal-bar',
        sectionTitle: 'Basic horizontal bar chart',
        title: 'Horizontal Ranking Bar Chart',
        description:
          'Set <code>plotOptions.bar.horizontal = true</code> to orient bars horizontally for clean readability of country or category labels.',
        selectorName: 'bar-horizontal-example',
        componentName: 'BarHorizontalExampleComponent',
        options: {
          series: [
            {
              name: 'Active Developers (k)',
              data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false },
          },
          colors: ['#d81b60'],
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          dataLabels: { enabled: false },
          xaxis: {
            categories: [
              'South Korea',
              'Canada',
              'United Kingdom',
              'Netherlands',
              'Italy',
              'France',
              'Japan',
              'United States',
              'China',
              'Germany',
            ],
          },
        },
      },
      {
        id: 'grouped-horizontal-bar',
        sectionTitle: 'Grouped & stacked horizontal bars',
        title: 'Grouped Horizontal Comparison Chart',
        description:
          'Compare two or more series horizontally with inline data labels enabled for direct side-by-side inspection.',
        selectorName: 'bar-grouped-example',
        componentName: 'BarGroupedExampleComponent',
        options: {
          series: [
            {
              name: '2025',
              data: [44, 55, 41, 64, 22, 43, 21],
            },
            {
              name: '2026',
              data: [53, 32, 33, 52, 13, 44, 32],
            },
          ],
          chart: {
            type: 'bar',
            height: 380,
            toolbar: { show: false },
          },
          colors: ['#d81b60', '#3949ab'],
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: { position: 'top' },
              borderRadius: 3,
            },
          },
          dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
              fontSize: '11px',
              colors: ['#fff'],
            },
          },
          stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
          },
          xaxis: {
            categories: ['Design', 'Frontend', 'Backend', 'DevOps', 'QA', 'Mobile', 'Data'],
          },
        },
      },
    ],
  },
  {
    id: 'mixed-charts',
    name: 'Mixed Charts',
    summary: 'Combine columns, lines, and shaded areas in a single unified coordinate system.',
    overview: [
      'Mixed combo charts allow each item in the <code>[series]</code> array to specify its own <code>type</code> (<code>"column"</code>, <code>"line"</code>, or <code>"area"</code>).',
      'Pair mixed series with multiple <code>[yaxis]</code> definitions to plot metrics with different units (such as order volume vs. conversion rate) on the same chart.',
    ],
    apiProperties: [
      {
        name: 'series[i].type',
        type: "'line' | 'area' | 'column' | 'bar'",
        description: 'Overrides the chart type for an individual series within a mixed chart.',
      },
      {
        name: 'yaxis',
        type: 'ApexYAxis[]',
        description: 'Array of Y-axis configurations corresponding to each series, supporting opposite right-hand axes.',
      },
    ],
    examples: [
      {
        id: 'line-column-mixed',
        sectionTitle: 'Line & column combo chart',
        title: 'Traffic Sources & Conversion Rate Combo',
        description:
          'Combines a <code>column</code> series and a <code>line</code> series with dual Y-axes (`yaxis[1].opposite = true`).',
        selectorName: 'mixed-line-column-example',
        componentName: 'MixedLineColumnExampleComponent',
        options: {
          series: [
            {
              name: 'Website Blog',
              type: 'column',
              data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
            },
            {
              name: 'Social Media',
              type: 'line',
              data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
            },
          ],
          chart: {
            height: 350,
            type: 'line',
            toolbar: { show: false },
          },
          colors: ['#3949ab', '#d81b60'],
          stroke: {
            width: [0, 4],
          },
          title: {
            text: 'Traffic Sources',
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
          },
          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
          },
          yaxis: [
            {
              title: { text: 'Website Blog Visits' },
            },
            {
              opposite: true,
              title: { text: 'Social Media Conversions' },
            },
          ],
        },
      },
      {
        id: 'line-area-column-mixed',
        sectionTitle: 'Line, area & column chart',
        title: 'Triple-Type Line, Area & Column Chart',
        description:
          'Renders a column series, a shaded area series, and a smooth line series together by setting <code>stroke.width</code>, <code>fill.opacity</code>, and <code>series[i].type</code> per series.',
        selectorName: 'mixed-triple-example',
        componentName: 'MixedTripleExampleComponent',
        options: {
          series: [
            {
              name: 'Team A (Column)',
              type: 'column',
              data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },
            {
              name: 'Team B (Area)',
              type: 'area',
              data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
            },
            {
              name: 'Team C (Line)',
              type: 'line',
              data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            },
          ],
          chart: {
            height: 350,
            type: 'line',
            stacked: false,
            toolbar: { show: false },
          },
          colors: ['#3949ab', '#00acc1', '#d81b60'],
          stroke: {
            width: [0, 2, 4],
            curve: 'smooth',
          },
          plotOptions: {
            bar: {
              columnWidth: '50%',
              borderRadius: 4,
            },
          },
          fill: {
            opacity: [0.85, 0.25, 1],
          },
          xaxis: {
            categories: [
              '01/01',
              '02/01',
              '03/01',
              '04/01',
              '05/01',
              '06/01',
              '07/01',
              '08/01',
              '09/01',
              '10/01',
              '11/01',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'pie-charts',
    name: 'Pie & Donut',
    summary: 'Show proportional part-to-whole relationships with interactive pie slices and donut rings.',
    overview: [
      'Non-axis proportional charts use <code>chart.type = "pie"</code> or <code>chart.type = "donut"</code>. Pass a flat numeric array to <code>[series]</code> and category names to <code>[labels]</code>.',
      'Donut charts also support center summary labels and custom cutout sizes via <code>plotOptions.pie.donut</code>.',
    ],
    apiProperties: [
      {
        name: 'series',
        type: 'ApexNonAxisChartSeries (number[])',
        description: 'Numeric values representing each slice of the pie or donut.',
      },
      {
        name: 'labels',
        type: 'string[]',
        description: 'Slice names displayed in the legend and hover tooltips.',
      },
      {
        name: 'plotOptions.pie.donut.size',
        type: 'string',
        description: 'Inner ring cutout percentage for donut charts (default "65%").',
      },
    ],
    examples: [
      {
        id: 'simple-pie-chart',
        sectionTitle: 'Simple pie chart',
        title: 'Simple Market Share Pie Chart',
        description:
          'Bind a numeric array to <code>[series]</code> and string labels to <code>[labels]</code> with responsive rules for mobile viewports.',
        selectorName: 'pie-simple-example',
        componentName: 'PieSimpleExampleComponent',
        options: {
          series: [44, 55, 13, 43, 22],
          chart: {
            height: 340,
            type: 'pie',
          },
          colors: ['#d81b60', '#3949ab', '#00897b', '#fb8c00', '#8e24aa'],
          labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        id: 'donut-chart',
        sectionTitle: 'Donut chart with center total',
        title: 'Donut Chart with Center Total Label',
        description:
          'Configure <code>plotOptions.pie.donut.labels.show = true</code> to display the hovered slice value and total sum inside the center ring.',
        selectorName: 'donut-total-example',
        componentName: 'DonutTotalExampleComponent',
        options: {
          series: [44, 55, 41, 17, 15],
          chart: {
            type: 'donut',
            height: 340,
          },
          colors: ['#e91e63', '#5c6bc0', '#26a69a', '#ffa726', '#ab47bc'],
          labels: ['Direct', 'Affiliates', 'Sponsored', 'Organic', 'Email'],
          plotOptions: {
            pie: {
              donut: {
                size: '68%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: 'Total Sessions',
                  },
                },
              },
            },
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  },
  {
    id: 'radialbar-charts',
    name: 'RadialBar & Gauge',
    summary: 'Display circular progress indicators, KPI completion rings, and multi-track gauges.',
    overview: [
      'RadialBar charts (<code>chart.type = "radialBar"</code>) map percentage values (<code>0–100</code>) onto circular arcs.',
      'Use <code>plotOptions.radialBar</code> to customize hollow center size, track background, start/end angles for semi-circle gauges, and summary labels.',
    ],
    apiProperties: [
      {
        name: 'plotOptions.radialBar.hollow.size',
        type: 'string',
        description: 'Inner hollow circle diameter as a percentage of the chart area.',
      },
      {
        name: 'plotOptions.radialBar.startAngle / endAngle',
        type: 'number',
        description: 'Start and end angles in degrees (e.g., -135 to 135 for speedometer gauges).',
      },
    ],
    examples: [
      {
        id: 'basic-radialbar-chart',
        sectionTitle: 'Single KPI radial gauge',
        title: 'Basic Circular Progress RadialBar',
        description:
          'Renders a single percentage KPI indicator with a hollow center label.',
        selectorName: 'radialbar-basic-example',
        componentName: 'RadialbarBasicExampleComponent',
        options: {
          series: [76],
          chart: {
            height: 330,
            type: 'radialBar',
          },
          colors: ['#d81b60'],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '68%',
              },
            },
          },
          labels: ['Sprint Completion'],
        },
      },
      {
        id: 'multi-radialbar-chart',
        sectionTitle: 'Multiple concentric radial bars',
        title: 'Multi-Track Goal Progress RadialBar',
        description:
          'Pass multiple values in <code>[series]</code> and matching <code>[labels]</code> to render concentric rings with a total average in the center.',
        selectorName: 'radialbar-multi-example',
        componentName: 'RadialbarMultiExampleComponent',
        options: {
          series: [44, 55, 67, 83],
          chart: {
            height: 340,
            type: 'radialBar',
          },
          colors: ['#d81b60', '#3949ab', '#00897b', '#fb8c00'],
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: { fontSize: '20px' },
                value: { fontSize: '15px' },
                total: {
                  show: true,
                  label: 'Overall',
                },
              },
            },
          },
          labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
        },
      },
    ],
  },
  {
    id: 'radar-charts',
    name: 'Radar Charts',
    summary: 'Compare multivariate attributes and skill profiles across radial axes.',
    overview: [
      'Radar (spider) charts plot one or more series across radial spokes sharing a common center. Set <code>chart.type = "radar"</code> and define spoke labels in <code>xaxis.categories</code>.',
      'Radar charts are commonly used for capability matrices, product feature comparisons, and performance scorecards.',
    ],
    apiProperties: [
      {
        name: 'plotOptions.radar.polygons',
        type: 'ApexRadarPolygons',
        description: 'Customizes the web stroke colors, connector lines, and alternating polygon fill colors.',
      },
    ],
    examples: [
      {
        id: 'basic-radar-chart',
        sectionTitle: 'Basic radar chart',
        title: 'Single-Series Capability Radar Chart',
        description:
          'Plots six competency dimensions on a radial grid using <code>chart.type = "radar"</code>.',
        selectorName: 'radar-basic-example',
        componentName: 'RadarBasicExampleComponent',
        options: {
          series: [
            {
              name: 'Engineering Profile',
              data: [80, 50, 30, 40, 100, 20],
            },
          ],
          chart: {
            height: 340,
            type: 'radar',
            toolbar: { show: false },
          },
          colors: ['#d81b60'],
          xaxis: {
            categories: ['Architecture', 'Testing', 'Security', 'UX', 'Performance', 'Docs'],
          },
        },
      },
      {
        id: 'multi-series-radar-chart',
        sectionTitle: 'Multi-series polygon radar',
        title: 'Multi-Series Team Comparison Radar Chart',
        description:
          'Overlay multiple series with semi-transparent fills (<code>fill.opacity</code>) and visible vertex markers to compare profiles.',
        selectorName: 'radar-multi-example',
        componentName: 'RadarMultiExampleComponent',
        options: {
          series: [
            {
              name: 'Series 1',
              data: [80, 50, 30, 40, 100, 20],
            },
            {
              name: 'Series 2',
              data: [20, 30, 40, 80, 20, 80],
            },
            {
              name: 'Series 3',
              data: [44, 76, 78, 13, 43, 10],
            },
          ],
          chart: {
            height: 350,
            type: 'radar',
            dropShadow: {
              enabled: true,
              blur: 1,
              left: 1,
              top: 1,
            },
            toolbar: { show: false },
          },
          colors: ['#d81b60', '#3949ab', '#00897b'],
          stroke: { width: 2 },
          fill: { opacity: 0.2 },
          markers: { size: 3 },
          xaxis: {
            categories: ['2021', '2022', '2023', '2024', '2025', '2026'],
          },
        },
      },
    ],
  },
  {
    id: 'scatter-charts',
    name: 'Scatter & Bubble',
    summary: 'Reveal correlations, clusters, and three-dimensional `[x, y, z]` distributions.',
    overview: [
      'Scatter charts (<code>chart.type = "scatter"</code>) plot <code>[x, y]</code> coordinate pairs to expose correlations and outliers across continuous numeric axes.',
      'Bubble charts (<code>chart.type = "bubble"</code>) add a third dimension <code>[x, y, z]</code> where <code>z</code> controls the radius of each marker.',
    ],
    apiProperties: [
      {
        name: 'xaxis.tickAmount',
        type: 'number',
        description: 'Controls the number of tick intervals along a numeric X-axis.',
      },
      {
        name: 'plotOptions.bubble.minBubbleRadius / maxBubbleRadius',
        type: 'number',
        description: 'Clamps the minimum and maximum rendered radius of bubbles in pixels.',
      },
    ],
    examples: [
      {
        id: 'scatter-plot-chart',
        sectionTitle: 'XY scatter plot',
        title: 'Multi-Cluster XY Scatter Chart',
        description:
          'Pass <code>[x, y]</code> coordinate pairs in each series with zoom enabled on both axes.',
        selectorName: 'scatter-basic-example',
        componentName: 'ScatterBasicExampleComponent',
        options: {
          series: [
            {
              name: 'Cluster A',
              data: [
                [16.4, 5.4],
                [21.7, 2],
                [25.4, 3],
                [19, 2],
                [10.9, 1],
                [13.6, 3.2],
                [10.9, 7.4],
                [10.9, 0],
                [10.9, 8.2],
              ],
            },
            {
              name: 'Cluster B',
              data: [
                [36.4, 13.4],
                [1.7, 11],
                [5.4, 8],
                [9, 17],
                [1.9, 4],
                [3.6, 12.2],
                [1.9, 14.4],
                [1.9, 9],
                [1.9, 13.2],
              ],
            },
          ],
          chart: {
            height: 340,
            type: 'scatter',
            zoom: {
              enabled: true,
              type: 'xy',
            },
            toolbar: { show: false },
          },
          colors: ['#d81b60', '#3949ab'],
          xaxis: {
            tickAmount: 10,
          },
          yaxis: {
            tickAmount: 7,
          },
        },
      },
      {
        id: 'bubble-chart',
        sectionTitle: '3D bubble chart',
        title: 'Three-Dimensional Bubble Chart',
        description:
          'Each data point is a <code>[x, y, z]</code> tuple where the third value scales the bubble radius.',
        selectorName: 'bubble-basic-example',
        componentName: 'BubbleBasicExampleComponent',
        options: {
          series: [
            {
              name: 'North America',
              data: [
                [10, 20, 35],
                [20, 45, 50],
                [35, 30, 25],
                [50, 60, 42],
                [65, 38, 30],
              ],
            },
            {
              name: 'Europe',
              data: [
                [15, 35, 28],
                [28, 25, 45],
                [42, 52, 38],
                [58, 32, 22],
                [72, 55, 48],
              ],
            },
          ],
          chart: {
            height: 340,
            type: 'bubble',
            toolbar: { show: false },
          },
          colors: ['#e91e63', '#1e88e5'],
          dataLabels: { enabled: false },
          fill: { opacity: 0.8 },
          xaxis: {
            tickAmount: 8,
            type: 'category',
          },
          yaxis: {
            max: 75,
          },
        },
      },
    ],
  },
  {
    id: 'candlestick-charts',
    name: 'Candlestick',
    summary: 'Visualize financial OHLC (Open, High, Low, Close) price movements over time.',
    overview: [
      'Candlestick charts (<code>chart.type = "candlestick"</code>) accept data points shaped as <code>{ x: Date | string, y: [open, high, low, close] }</code>.',
      'Customize upward (bullish) and downward (bearish) candle colors via <code>plotOptions.candlestick.colors</code>.',
    ],
    apiProperties: [
      {
        name: 'plotOptions.candlestick.colors.upward',
        type: 'string',
        description: 'Hex color for candles where close >= open (default green).',
      },
      {
        name: 'plotOptions.candlestick.colors.downward',
        type: 'string',
        description: 'Hex color for candles where close < open (default red).',
      },
    ],
    examples: [
      {
        id: 'basic-candlestick-chart',
        sectionTitle: 'OHLC candlestick chart',
        title: 'Financial OHLC Candlestick Chart',
        description:
          'Each item in <code>series[0].data</code> contains an <code>x</code> timestamp/label and a 4-element <code>y: [open, high, low, close]</code> array.',
        selectorName: 'candlestick-basic-example',
        componentName: 'CandlestickBasicExampleComponent',
        options: {
          series: [
            {
              name: 'candle',
              data: [
                { x: '09:30', y: [6629.81, 6650.5, 6623.04, 6633.33] },
                { x: '10:00', y: [6632.01, 6643.59, 6620, 6630.11] },
                { x: '10:30', y: [6630.71, 6648.95, 6623.34, 6635.65] },
                { x: '11:00', y: [6635.65, 6651, 6629.67, 6638.24] },
                { x: '11:30', y: [6638.24, 6640, 6620, 6624.47] },
                { x: '12:00', y: [6624.53, 6636.03, 6621.68, 6624.31] },
                { x: '12:30', y: [6624.61, 6632.2, 6617, 6626.02] },
                { x: '13:00', y: [6627, 6627.62, 6584.22, 6603.02] },
                { x: '13:30', y: [6605, 6608.03, 6598.95, 6604.01] },
                { x: '14:00', y: [6604.5, 6614.4, 6602.26, 6608.02] },
              ],
            },
          ],
          chart: {
            type: 'candlestick',
            height: 350,
            toolbar: { show: false },
          },
          title: {
            text: 'Intraday Index Movement',
            align: 'left',
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#26a69a',
                downward: '#ef5350',
              },
            },
          },
          xaxis: {
            type: 'category',
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        },
      },
    ],
  },
  {
    id: 'heatmap-charts',
    name: 'Heatmap & Treemap',
    summary: 'Encode matrix density with color-scaled heatmaps and hierarchical proportions with treemaps.',
    overview: [
      'Heatmap charts (<code>chart.type = "heatmap"</code>) represent values across a two-dimensional matrix of categories using color intensity or discrete color ranges.',
      'Treemap charts (<code>chart.type = "treemap"</code>) partition rectangular space proportionally to each item\'s <code>y</code> value.',
    ],
    apiProperties: [
      {
        name: 'plotOptions.heatmap.colorScale.ranges',
        type: 'ApexColorScaleRanges[]',
        description: 'Defines custom value intervals ({ from, to, color, name }) for heatmap cells.',
      },
      {
        name: 'plotOptions.treemap.distributed',
        type: 'boolean',
        description: 'Colors each treemap tile individually using the [colors] array.',
      },
    ],
    examples: [
      {
        id: 'color-range-heatmap',
        sectionTitle: 'Color-range heatmap',
        title: 'Server Load Matrix Heatmap',
        description:
          'Uses <code>plotOptions.heatmap.colorScale.ranges</code> to map low, medium, and high intensity thresholds to distinct colors.',
        selectorName: 'heatmap-range-example',
        componentName: 'HeatmapRangeExampleComponent',
        options: {
          series: [
            {
              name: 'Node 1',
              data: [
                { x: '00:00', y: 12 },
                { x: '04:00', y: 28 },
                { x: '08:00', y: 54 },
                { x: '12:00', y: 82 },
                { x: '16:00', y: 65 },
                { x: '20:00', y: 39 },
              ],
            },
            {
              name: 'Node 2',
              data: [
                { x: '00:00', y: 18 },
                { x: '04:00', y: 22 },
                { x: '08:00', y: 47 },
                { x: '12:00', y: 74 },
                { x: '16:00', y: 88 },
                { x: '20:00', y: 41 },
              ],
            },
            {
              name: 'Node 3',
              data: [
                { x: '00:00', y: 8 },
                { x: '04:00', y: 15 },
                { x: '08:00', y: 36 },
                { x: '12:00', y: 58 },
                { x: '16:00', y: 49 },
                { x: '20:00', y: 24 },
              ],
            },
          ],
          chart: {
            height: 320,
            type: 'heatmap',
            toolbar: { show: false },
          },
          plotOptions: {
            heatmap: {
              shadeIntensity: 0.5,
              radius: 4,
              colorScale: {
                ranges: [
                  { from: 0, to: 25, name: 'Low', color: '#26a69a' },
                  { from: 26, to: 60, name: 'Medium', color: '#42a5f5' },
                  { from: 61, to: 100, name: 'High', color: '#ec407a' },
                ],
              },
            },
          },
          dataLabels: { enabled: true },
        },
      },
      {
        id: 'distributed-treemap',
        sectionTitle: 'Distributed treemap chart',
        title: 'Regional Volume Distributed Treemap',
        description:
          'Renders proportional rectangular tiles with <code>chart.type = "treemap"</code> and <code>plotOptions.treemap.distributed = true</code>.',
        selectorName: 'treemap-distributed-example',
        componentName: 'TreemapDistributedExampleComponent',
        options: {
          series: [
            {
              data: [
                { x: 'San Francisco', y: 218 },
                { x: 'New York', y: 149 },
                { x: 'London', y: 184 },
                { x: 'Tokyo', y: 135 },
                { x: 'Berlin', y: 84 },
                { x: 'Singapore', y: 112 },
                { x: 'Sydney', y: 74 },
                { x: 'Toronto', y: 68 },
              ],
            },
          ],
          chart: {
            height: 340,
            type: 'treemap',
            toolbar: { show: false },
          },
          colors: [
            '#d81b60',
            '#8e24aa',
            '#3949ab',
            '#1e88e5',
            '#00897b',
            '#43a047',
            '#fb8c00',
            '#546e7a',
          ],
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false,
            },
          },
          legend: { show: false },
        },
      },
    ],
  },
];
