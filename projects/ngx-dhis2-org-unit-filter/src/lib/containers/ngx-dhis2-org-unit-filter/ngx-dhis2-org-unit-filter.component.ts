import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  OrgUnitFilterState,
  getOrgUnitLevels,
  LoadOrgUnitLevelAction
} from '../../store';
import { OrgUnitLevel } from '../../models';

@Component({
  selector: 'ngx-dhis2-org-unit-filter',
  templateUrl: './ngx-dhis2-org-unit-filter.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-filter.component.css']
})
export class NgxDhis2OrgUnitFilterComponent implements OnInit {
  orgUnitLevels$: Observable<OrgUnitLevel[]>;
  constructor(private store: Store<OrgUnitFilterState>) {
    store.dispatch(new LoadOrgUnitLevelAction());
    this.orgUnitLevels$ = store.select(getOrgUnitLevels);
  }

  ngOnInit() {}
}
