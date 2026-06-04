/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { combineLatest, Subscription } from 'rxjs';

import { NavigationFocus } from '../../shared/navigation-focus/navigation-focus';

import { ComponentPageTitle } from '../page-title/page-title';
import { DocItem } from '../documentation-items/documentation-items';

@Component({
    selector: 'app-component-category-list',
    templateUrl: './component-category-list.html',
    styleUrls: ['./component-category-list.scss'],
    imports: [NavigationFocus, RouterLink, MatRipple],
})
export class ComponentCategoryList {

    @Input()
    items: DocItem[] = [];
    @Input()
    categoryListSummary: string | undefined;


}