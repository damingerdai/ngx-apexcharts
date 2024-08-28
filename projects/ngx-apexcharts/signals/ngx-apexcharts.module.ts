import { NgModule } from '@angular/core';
import { ChartComponent } from './ngx-apexchart.component';
import { NgxApexchartsDirective } from './ngx-apexcharts.directive';

@NgModule({
  imports: [ChartComponent, NgxApexchartsDirective],
  exports: [ChartComponent, NgxApexchartsDirective],
})
export class NgxApexchartsModule {}
