import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { isOrgUnitSelected } from '../../helpers/is-org-unit-selected.helper';
import { MINUS_CIRCLE_ICON, PLUS_CIRCLE_ICON } from '../../icons';
import { OrgUnit } from '../../models';
import { OrgUnitFilterState } from '../../store/reducers/index';
import {
  getOrgUnitById,
  getSelectedOrgUnitChildrenCount
} from '../../store/selectors/org-unit.selectors';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-tree-item',
  templateUrl: './ngx-dhis2-org-unit-tree-item.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-tree-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxDhis2OrgUnitTreeItemComponent implements OnInit, OnChanges {
  @Input() orgUnitId: string;
  @Input() expanded: boolean;
  @Input() selectedOrgUnits: any[];
  @Input() parentOrgUnit: any;

  // events
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  orgUnit$: Observable<OrgUnit>;
  selected: boolean;
  selectedChildrenCount$: Observable<number>;

  // icons
  plusCircleIcon: string;
  minusCircleIcon: string;
  constructor(private store: Store<OrgUnitFilterState>) {
    // icons initialization
    this.plusCircleIcon = PLUS_CIRCLE_ICON;
    this.minusCircleIcon = MINUS_CIRCLE_ICON;
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (
      simpleChanges.selectedOrgUnits &&
      !simpleChanges.selectedOrgUnits.firstChange
    ) {
      this.setOrgUnitProperties();
    }
  }

  ngOnInit() {
    if (this.orgUnitId) {
      // fetch current org unit
      this.orgUnit$ = this.store.select(getOrgUnitById(this.orgUnitId));
      this.setOrgUnitProperties(true);
    }
  }

  setOrgUnitProperties(firstChange?: boolean) {
    // get org unit selection status
    this.selected = isOrgUnitSelected(
      this.orgUnitId,
      this.selectedOrgUnits || []
    );

    this.orgUnit$.pipe(take(1)).subscribe((orgUnit: OrgUnit) => {
      if (orgUnit) {
        // Get count of selected children for this organisation unit
        this.selectedChildrenCount$ = this.store.select(
          getSelectedOrgUnitChildrenCount(
            this.orgUnitId,
            this.selectedOrgUnits || []
          )
        );

        this.selectedChildrenCount$
          .pipe(take(1))
          .subscribe((selectedChildrenCount: number) => {
            // Set expanded property for the current orgunits
            if (!this.expanded && firstChange) {
              this.expanded = !this.parentOrgUnit || selectedChildrenCount > 0;
            }
          });
      }
    });
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

  trackByFn(index, item) {
    return item;
  }
}
