import { Component, OnInit } from '@angular/core';
import { TICK } from '../../icons';

@Component({
  selector: 'ngx-dhis2-org-unit-level-group',
  templateUrl: './ngx-dhis2-org-unit-level-group.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-level-group.component.css']
})
export class NgxDhis2OrgUnitLevelGroupComponent implements OnInit {
  tickIcon: string;
  constructor() {
    this.tickIcon = TICK;
  }

  ngOnInit() {}
}
