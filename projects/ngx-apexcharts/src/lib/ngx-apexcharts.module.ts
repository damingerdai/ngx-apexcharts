import { NgModule } from "@angular/core";
import { ChartComponent } from "./chart/chart.component";
import { NgxApexchartsDirective } from "./ngx-apexcharts.directive";

@NgModule({
  imports: [ChartComponent, NgxApexchartsDirective],
  exports: [ChartComponent, NgxApexchartsDirective],
})
export class NgxApexchartsModule {}
