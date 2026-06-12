import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./footer.scss'],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
