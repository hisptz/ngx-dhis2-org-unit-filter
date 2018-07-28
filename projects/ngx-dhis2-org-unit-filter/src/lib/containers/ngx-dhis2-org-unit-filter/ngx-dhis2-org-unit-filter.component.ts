import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  OrgUnitFilterState,
  getOrgUnitLevels,
  getOrgUnitGroups,
  LoadOrgUnitLevelsAction,
  LoadOrgUnitGroupsAction,
  LoadOrgUnitsAction
} from '../../store';
import { OrgUnitLevel, OrgUnitGroup } from '../../models';
import { OrgUnitFilterConfig } from '../../models/org-unit-filter-config.model';
import { DEFAULT_ORG_UNIT_FILTER_CONFIG } from '../../constants';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-filter',
  templateUrl: './ngx-dhis2-org-unit-filter.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-filter.component.css']
})
export class NgxDhis2OrgUnitFilterComponent implements OnInit {
  /**
   * Org unit filter configuration
   */
  @Input() orgUnitFilterConfig: OrgUnitFilterConfig;
  /**
   * Organisation unit level observable
   */
  orgUnitLevels$: Observable<OrgUnitLevel[]>;

  /**
   * Organisation unit group observable
   */
  orgUnitGroups$: Observable<OrgUnitGroup[]>;

  constructor(private store: Store<OrgUnitFilterState>) {
    // default org unit filter configuration
    this.orgUnitFilterConfig = DEFAULT_ORG_UNIT_FILTER_CONFIG;
    // Dispatching actions to load organisation unit information
    store.dispatch(new LoadOrgUnitLevelsAction());
    store.dispatch(new LoadOrgUnitGroupsAction());
    store.dispatch(new LoadOrgUnitsAction(this.orgUnitFilterConfig));

    // Selecting organisation unit information
    this.orgUnitLevels$ = store.select(getOrgUnitLevels);
    this.orgUnitGroups$ = store.select(getOrgUnitGroups);
  }

  ngOnInit() {}
}
