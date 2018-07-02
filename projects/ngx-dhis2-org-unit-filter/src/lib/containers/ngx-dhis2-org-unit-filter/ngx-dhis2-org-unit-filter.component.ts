import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  OrgUnitFilterState,
  getOrgUnitLevels,
  getOrgUnitGroups,
  LoadOrgUnitLevelAction,
  LoadOrgUnitGroupAction
} from '../../store';
import { OrgUnitLevel, OrgUnitGroup } from '../../models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-filter',
  templateUrl: './ngx-dhis2-org-unit-filter.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-filter.component.css']
})
export class NgxDhis2OrgUnitFilterComponent implements OnInit {
  /**
   * Organisation unit level observable
   */
  orgUnitLevels$: Observable<OrgUnitLevel[]>;

  /**
   * Organisation unit group observable
   */
  orgUnitGroups$: Observable<OrgUnitGroup[]>;

  constructor(private store: Store<OrgUnitFilterState>) {
    // Dispatching actions to load organisation unit information
    store.dispatch(new LoadOrgUnitLevelAction());
    store.dispatch(new LoadOrgUnitGroupAction());

    // Selecting organisation unit information
    this.orgUnitLevels$ = store.select(getOrgUnitLevels);
    this.orgUnitGroups$ = store.select(getOrgUnitGroups);
  }

  ngOnInit() {}
}
