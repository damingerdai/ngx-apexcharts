import { Component, inject, viewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer';
import { ChartsNavComponent } from '../../shared/charts-nav/charts-nav.component';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

// These constants are used by the ComponentSidenav for orchestrating the MatSidenav in a responsive
// way. This includes hiding the sidenav, defaulting it to open, changing the mode from over to
// side, determining the size of the top gap, and whether the sidenav is fixed in the viewport.
// The values were determined through the combination of Material Design breakpoints and careful
// testing of the application across a range of common device widths (360px+).
// These breakpoint values need to stay in sync with the related Sass variables in
// src/styles/_constants.scss.
const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: 'app-charts',
  imports: [
    MatSidenavModule,
    RouterModule,

    ChartsNavComponent,
    FooterComponent,

    AsyncPipe,
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ChartsComponent {

  readonly sidenav = viewChild(MatSidenav);
  isExtraScreenSmall: Observable<boolean>;
  isScreenSmall: Observable<boolean>;

  constructor() {
    const breakpoints = inject(BreakpointObserver);

    this.isExtraScreenSmall = breakpoints
      .observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
    this.isScreenSmall = breakpoints
      .observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
  }

}
