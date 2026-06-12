import {Component, HostBinding, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-homepage',
  imports: [
    MatButtonModule,
    RouterLink,
    MatDividerModule,
    MatIconModule,

    FooterComponent,
  ],
  templateUrl: './homepage.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './homepage.scss'
})
export class HomepageComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  @HostBinding('class.animations-disabled') readonly animationsDisabled: boolean;

}
