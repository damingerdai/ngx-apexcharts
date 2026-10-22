import { Component, inject, viewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer';
import { ChartsNavComponent } from '../../shared/charts-nav/charts-nav.component';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: 'app-charts',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,

    ChartsNavComponent,
    FooterComponent,

    AsyncPipe,
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
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

  toggleSidenav(): void {
    this.sidenav()?.toggle();
  }
}
