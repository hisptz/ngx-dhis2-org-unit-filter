import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import * as _ from 'lodash';
import { TICK } from '../../icons/tick';
import { OrgUnitLevel } from '../../models/org-unit-level.model';
import { OrgUnitGroup } from '../../models/org-unit-group.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-level-group',
  templateUrl: './ngx-dhis2-org-unit-level-group.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-level-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxDhis2OrgUnitLevelGroupComponent implements OnInit {
  /**
   * Input for organisation unit levels
   */
  @Input() orgUnitLevels: OrgUnitLevel[];

  @Input() loadingLevels: boolean;
  @Input() loadingGroups: boolean;

  /**
   * Input for organisation unit groups
   */
  @Input() orgUnitGroups: OrgUnitGroup[];

  /**
   * base 64 image string for the tick icon
   */
  tickIcon: string;

  /**
   * Search query for org unit group and levels
   */
  orgUnitGroupLevelSearchQuery: string;

  @Output() activateOrgUnitLevelOrGroup = new EventEmitter();
  @Output() deactivateOrgUnitLevelOrGroup = new EventEmitter();

  get selectedLevelsCount(): number {
    return (this.orgUnitLevels || []).filter(
      (orgUnitLevel: OrgUnitLevel) => orgUnitLevel.selected
    ).length;
  }

  get selectedGroupsCount(): number {
    return (this.orgUnitGroups || []).filter(
      (orgUnitGroup: OrgUnitGroup) => orgUnitGroup.selected
    ).length;
  }

  constructor() {
    this.tickIcon = TICK;
  }

  ngOnInit() {}

  onOrgUnitGroupLevelFilter(e) {
    e.stopPropagation();
    this.orgUnitGroupLevelSearchQuery = e.target.value;
  }

  onUpdate(e, selectedOrgUnitLevelOrGroup: any, itemType: string) {
    e.stopPropagation();
    if (selectedOrgUnitLevelOrGroup.selected) {
      this.deactivateOrgUnitLevelOrGroup.emit({
        id:
          itemType === 'LEVEL'
            ? 'LEVEL-' + selectedOrgUnitLevelOrGroup.level
            : 'OU_GROUP-' + selectedOrgUnitLevelOrGroup.id,
        name: selectedOrgUnitLevelOrGroup.name,
        type:
          itemType === 'LEVEL'
            ? 'ORGANISATION_UNIT_LEVEL'
            : 'ORGANISATION_UNIT_GROUP'
      });
    } else {
      this.activateOrgUnitLevelOrGroup.emit({
        id:
          itemType === 'LEVEL'
            ? 'LEVEL-' + selectedOrgUnitLevelOrGroup.level
            : 'OU_GROUP-' + selectedOrgUnitLevelOrGroup.id,
        name: selectedOrgUnitLevelOrGroup.name,
        type:
          itemType === 'LEVEL'
            ? 'ORGANISATION_UNIT_LEVEL'
            : 'ORGANISATION_UNIT_GROUP'
      });
    }
  }
}
