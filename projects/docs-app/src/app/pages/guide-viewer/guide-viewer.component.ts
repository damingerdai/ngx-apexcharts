import { Component, HostBinding } from '@angular/core';
import { TableOfContents } from '../../shared/table-of-contents/table-of-contents';
import { DocViewer } from '../../shared/doc-viewer/doc-viewer';
import { NavigationFocus } from '../../shared/navigation-focus/navigation-focus';
import { ComponentPageTitle } from '../../shared/page-title/page-title';
import { NgIf } from '@angular/common';

export interface GuideItem {
  id: string;
  name: string;
  document: string;
  overview: string;
}

@Component({
  selector: 'app-guide-viewer',
  standalone: true,
  imports: [
    DocViewer,
    TableOfContents,
    NavigationFocus,
    NgIf
  ],
  templateUrl: './guide-viewer.component.html',
  styleUrl: './guide-viewer.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class GuideViewerComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  guide: GuideItem | undefined;

  constructor(
              private _componentPageTitle: ComponentPageTitle,
          ) {
            this.guide =
              {
                id: 'getting-started',
                name: 'Getting started',
                document: '/docs-content/guide.html',
                overview: 'Add Ngx Apexcharts to your project!'
              };
  }

  ngOnInit(): void {
    if (this.guide !== undefined) {
      this._componentPageTitle.title = this.guide.name;
    }
  }

}
