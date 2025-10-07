import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-charts-nav',
  imports: [
    MatListModule,
    RouterModule,
  ],
  templateUrl: './charts-nav.component.html',
  styleUrl: './charts-nav.component.scss'
})
export class ChartsNavComponent {

  protected items = [
    {
      name: "Line Charts",
      link: "line-charts"
    }
  ]

}
