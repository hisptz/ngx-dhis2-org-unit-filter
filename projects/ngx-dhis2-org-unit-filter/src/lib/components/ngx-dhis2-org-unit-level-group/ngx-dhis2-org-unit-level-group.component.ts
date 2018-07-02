import { Component, OnInit, Input } from '@angular/core';
import { TICK } from '../../icons';
import { OrgUnitLevel } from '../../models';

@Component({
  selector: 'ngx-dhis2-org-unit-level-group',
  templateUrl: './ngx-dhis2-org-unit-level-group.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-level-group.component.css']
})
export class NgxDhis2OrgUnitLevelGroupComponent implements OnInit {
  @Input() orgUnitLevels: OrgUnitLevel[];
  tickIcon: string;
  constructor() {
    this.tickIcon = TICK;
  }

  ngOnInit() {}
}
