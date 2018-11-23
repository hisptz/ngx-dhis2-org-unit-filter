import { Component } from '@angular/core';
import { OrgUnitFilterConfig } from 'projects/ngx-dhis2-org-unit-filter/src/lib/models/org-unit-filter-config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  orgUnitObject: any;
  action: string;
  orgUnitFilterConfig: OrgUnitFilterConfig = {
    singleSelection: false
  };

  onOrgUnitUpdate(orgUnitObject, action) {
    this.orgUnitObject = orgUnitObject;
    this.action = action;
  }
}
