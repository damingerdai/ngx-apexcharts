import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxApexchartsModule} from 'ngx-apexcharts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SeriesPipe } from './series.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SeriesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
