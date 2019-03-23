import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';

import { MINUS_CIRCLE_ICON, PLUS_CIRCLE_ICON } from '../../icons';
import { OrgUnit } from '../../models';
import { OrgUnitFilterState } from '../../store';
import { getOrgUnitById } from '../../store/selectors/org-unit.selectors';
import { isOrgUnitSelected } from '../../helpers/is-org-unit-selected.helper';
import { getSelectedOrgUnitChildrenCount } from '../../helpers/get-selected-org-unit-children-count.helper';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-tree-item',
  templateUrl: './ngx-dhis2-org-unit-tree-item.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-tree-item.component.css']
})
export class NgxDhis2OrgUnitTreeItemComponent implements OnInit {
  @Input() orgUnitId: string;
  @Input() expanded: boolean;
  @Input() selectedOrgUnits: any[];
  @Input() parentOrgUnit: any;

  // events
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  orgUnit$: Observable<OrgUnit>;
  selected: boolean;
  selectedChildrenCount: number;

  // icons
  plusCircleIcon: string;
  minusCircleIcon: string;
  constructor(private store: Store<OrgUnitFilterState>) {
    // icons initialization
    this.plusCircleIcon = PLUS_CIRCLE_ICON;
    this.minusCircleIcon = MINUS_CIRCLE_ICON;
    this.selectedChildrenCount = 0;
  }

  ngOnInit() {
    if (this.orgUnitId) {
      // fetch current org unit
      this.orgUnit$ = this.store.select(getOrgUnitById(this.orgUnitId));

      // get org unit selection status
      this.selected = isOrgUnitSelected(this.orgUnitId, this.selectedOrgUnits);

      this.orgUnit$.pipe(take(1)).subscribe((orgUnit: OrgUnit) => {
        if (orgUnit) {
          // Get count of selected children for this organisation unit
          this.selectedChildrenCount = getSelectedOrgUnitChildrenCount(
            orgUnit.children,
            this.selectedOrgUnits
          );

          // Set expanded property for the current orgunits
          this.expanded = !this.parentOrgUnit || this.selectedChildrenCount > 0;
        }
      });
    }
  }

  onToggleOrgUnitChildren(e) {
    e.stopPropagation();
    this.expanded = !this.expanded;
  }

  onToggleOrgUnit(e) {
    e.stopPropagation();
    this.orgUnit$.pipe(take(1)).subscribe((orgUnit: OrgUnit) => {
      if (this.selected) {
        this.onDeactivateOu(orgUnit);
      } else {
        this.onActivateOu(orgUnit);
      }

      this.selected = !this.selected;
    });
  }

  onDeactivateOu(organisationUnit) {
    this.deactivate.emit(organisationUnit);
  }

  onActivateOu(organisationUnit) {
    this.activate.emit(organisationUnit);
  }
}
