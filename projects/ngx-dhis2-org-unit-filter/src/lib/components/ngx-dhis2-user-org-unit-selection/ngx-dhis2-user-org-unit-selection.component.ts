import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { USER_ORG_UNITS } from '../../constants/user-org-units.constants';
import {
  updateOrgUnitListWithSelectionStatus,
  updateOrgUnitListWithTouchedOrgUnit
} from '../../helpers';
import { OrgUnit, OrgUnitFilterConfig } from '../../models';

@Component({
  selector: 'ngx-dhis2-user-org-unit-selection',
  templateUrl: './ngx-dhis2-user-org-unit-selection.component.html',
  styleUrls: ['./ngx-dhis2-user-org-unit-selection.component.css']
})
export class NgxDhis2UserOrgUnitSelectionComponent implements OnInit {
  @Input() selectedUserOrgUnits: any[];

  @Input() orgUnitFilterConfig: OrgUnitFilterConfig;
  @Output() activateUserOrgUnit: EventEmitter<any> = new EventEmitter<any>();
  @Output() deactivateUserOrgUnit: EventEmitter<any> = new EventEmitter<any>();

  userOrgUnits: OrgUnit[];

  constructor() {}

  ngOnInit() {
    this.userOrgUnits = updateOrgUnitListWithSelectionStatus(
      USER_ORG_UNITS,
      this.selectedUserOrgUnits
    );
  }

  onUpdate(e, selectedUserOrgUnit: any) {
    e.stopPropagation();
    // emit selected or deselected user org unit
    if (selectedUserOrgUnit.selected) {
      this.deactivateUserOrgUnit.emit({
        id: selectedUserOrgUnit.id,
        name: selectedUserOrgUnit.name,
        type: selectedUserOrgUnit.type
      });
    } else {
      this.activateUserOrgUnit.emit({
        id: selectedUserOrgUnit.id,
        name: selectedUserOrgUnit.name,
        type: selectedUserOrgUnit.type
      });
    }

    // Also update selected status in the list
    this.userOrgUnits = updateOrgUnitListWithTouchedOrgUnit(
      this.userOrgUnits,
      selectedUserOrgUnit,
      this.orgUnitFilterConfig
    );
  }
}
