import { Component, HostBinding, OnInit, inject, ChangeDetectionStrategy } from "@angular/core";
import { TableOfContents } from "../../shared/table-of-contents/table-of-contents";
import { DocViewer } from "../../shared/doc-viewer/doc-viewer";
import { NavigationFocus } from "../../shared/navigation-focus/navigation-focus";
import { ComponentPageTitle } from "../../shared/page-title/page-title";

export interface GuideItem {
  id: string;
  name: string;
  document: string;
  overview: string;
}

@Component({
  selector: "app-guide-viewer",
  imports: [DocViewer, TableOfContents, NavigationFocus],
  templateUrl: "./guide-viewer.component.html",
  styleUrl: "./guide-viewer.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  host: { ngSkipHydration: "true" },
})
export class GuideViewerComponent implements OnInit {
  private _componentPageTitle = inject(ComponentPageTitle);

  @HostBinding("class.main-content") readonly mainContentClass = true;
  guide: GuideItem | undefined;

  constructor() {
    this.guide = {
      id: "getting-started",
      name: "Getting started",
      document: "/docs-content/guide.html",
      overview: "Add Ngx Apexcharts to your project!",
    };
  }

  ngOnInit(): void {
    if (this.guide !== undefined) {
      this._componentPageTitle.title = this.guide.name;
    }
  }
}
