import { Component, OnInit, Input } from '@angular/core';
import { TICK } from '../../icons';
import { OrgUnitLevel, OrgUnitGroup } from '../../models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-level-group',
  templateUrl: './ngx-dhis2-org-unit-level-group.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-level-group.component.css']
})
export class NgxDhis2OrgUnitLevelGroupComponent implements OnInit {
  /**
   * Input for organisation unit levels
   */
  @Input() orgUnitLevels: OrgUnitLevel[];
  @Input() orgUnitGroups: OrgUnitGroup[];
  tickIcon: string;
  constructor() {
    this.tickIcon = TICK;
  }

  ngOnInit() {}
}
