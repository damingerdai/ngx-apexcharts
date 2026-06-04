/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatRipple } from "@angular/material/core";

import { NavigationFocus } from "../../shared/navigation-focus/navigation-focus";

import { DocItem } from "../documentation-items/documentation-items";

@Component({
  selector: "app-component-category-list",
  templateUrl: "./component-category-list.html",
  styleUrls: ["./component-category-list.scss"],
  imports: [NavigationFocus, RouterLink, MatRipple],
})
export class ComponentCategoryList {
  @Input()
  items: DocItem[] = [];
  @Input()
  categoryListSummary: string | undefined;
}
