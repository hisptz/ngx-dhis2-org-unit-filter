import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { OrgUnitFilterState } from '../../store/reducers';
import { LoadOrgUnitLevelAction } from '../../store';

@Component({
  selector: 'ngx-dhis2-org-unit-filter',
  templateUrl: './ngx-dhis2-org-unit-filter.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-filter.component.css']
})
export class NgxDhis2OrgUnitFilterComponent implements OnInit {
  constructor(private store: Store<OrgUnitFilterState>) {
    store.dispatch(new LoadOrgUnitLevelAction());
  }

  ngOnInit() {}
}
