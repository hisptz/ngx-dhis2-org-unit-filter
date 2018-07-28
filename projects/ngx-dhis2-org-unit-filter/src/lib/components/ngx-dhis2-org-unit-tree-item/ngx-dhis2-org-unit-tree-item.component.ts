import { Component, OnInit, Input } from '@angular/core';
import { OrgUnit } from '../../models';
import { PLUS_CIRCLE_ICON, MINUS_CIRCLE_ICON } from '../../icons';
import { Store } from '@ngrx/store';
import { OrgUnitFilterState } from '../../store';
import { Observable } from 'rxjs';
import { getOrgUnitById } from '../../store/selectors/org-unit.selectors';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-tree-item',
  templateUrl: './ngx-dhis2-org-unit-tree-item.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-tree-item.component.css']
})
export class NgxDhis2OrgUnitTreeItemComponent implements OnInit {
  @Input() orgUnitId: string;
  @Input() expanded: boolean;

  orgUnit$: Observable<OrgUnit>;

  // icons
  plusCircleIcon: string;
  minusCircleIcon: string;
  constructor(private store: Store<OrgUnitFilterState>) {
    // icons initialization
    this.plusCircleIcon = PLUS_CIRCLE_ICON;
    this.minusCircleIcon = MINUS_CIRCLE_ICON;
  }

  ngOnInit() {
    if (this.orgUnitId) {
      this.orgUnit$ = this.store.select(getOrgUnitById(this.orgUnitId));
    }
  }

  onToggleOrgUnit(e) {
    e.stopPropagation();
    this.expanded = !this.expanded;
  }
}
