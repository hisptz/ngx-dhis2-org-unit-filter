import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { CLOSE_ICON } from '../../icons';
import { OrgUnit } from '../../models';

@Component({
  selector: 'ngx-dhis2-org-unit-selected-org-unit',
  templateUrl: './ngx-dhis2-org-unit-selected-org-unit.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-selected-org-unit.component.css']
})
export class NgxDhis2OrgUnitSelectedOrgUnitComponent implements OnInit {
  @Input() selectedOrgUnits: any[];

  @Output() deactivateOrgUnit = new EventEmitter();
  @Output() deactivateAllOrgUnit = new EventEmitter();

  closeIcon: string;
  constructor() {
    this.closeIcon = CLOSE_ICON;
  }

  get selectedOrgUnitsOnly() {
    return _.filter(
      this.selectedOrgUnits || [],
      orgUnit => orgUnit.type === 'ORGANISATION_UNIT'
    );
  }

  ngOnInit() {}

  onDeactivateOrgUnit(orgUnit: OrgUnit, e) {
    e.stopPropagation();
    this.deactivateOrgUnit.emit(orgUnit);
  }

  onDeactivateAllOrgUnits(e) {
    e.stopPropagation();
    this.deactivateAllOrgUnit.emit(null);
  }
}
