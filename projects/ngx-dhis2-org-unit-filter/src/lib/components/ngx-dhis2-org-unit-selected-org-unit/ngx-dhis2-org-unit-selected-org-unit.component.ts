import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import * as _ from 'lodash';
import { CLOSE_ICON } from '../../icons/close.icon';
import { OrgUnit } from '../../models/org-unit.model';

@Component({
  selector: 'ngx-dhis2-org-unit-selected-org-unit',
  templateUrl: './ngx-dhis2-org-unit-selected-org-unit.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-selected-org-unit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxDhis2OrgUnitSelectedOrgUnitComponent implements OnInit {
  @Input() selectedOrgUnits: any[];

  @Output() deactivateOrgUnit = new EventEmitter();
  @Output() deactivateAllOrgUnits = new EventEmitter();

  closeIcon: string;
  maxOrgUnitToShow: number;
  showAll: boolean;
  constructor() {
    this.closeIcon = CLOSE_ICON;
    this.maxOrgUnitToShow = 3;
  }

  get selectedOrgUnitsForDisplay(): any[] {
    if (this.showAll) {
      return this.selectedOrgUnits || [];
    }
    return (this.selectedOrgUnits || []).slice(0, this.maxOrgUnitToShow);
  }

  get countOfMoreSelectedOrgUnit(): number {
    return (this.selectedOrgUnits || []).length - this.maxOrgUnitToShow;
  }

  get selectedString() {
    const selectedOrgUnitString = this.selectedOrgUnitsForDisplay
      .map((selectedOrgUnit: any) => selectedOrgUnit.name)
      .join(', ');
    return this.countOfMoreSelectedOrgUnit > 0
      ? selectedOrgUnitString + ` ${this.countOfMoreSelectedOrgUnit} and more`
      : selectedOrgUnitString;
  }

  ngOnInit() {}

  onDeactivateOrgUnit(orgUnit: OrgUnit, e) {
    e.stopPropagation();
    this.deactivateOrgUnit.emit(orgUnit);
  }

  onDeactivateAllOrgUnits(e) {
    e.stopPropagation();
    this.deactivateAllOrgUnits.emit(null);
  }

  onToggleShowMore(e) {
    e.stopPropagation();
    this.showAll = !this.showAll;
  }
}
