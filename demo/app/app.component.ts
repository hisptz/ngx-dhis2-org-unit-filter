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
    singleSelection: false,
    showUserOrgUnitSection: true,
    showOrgUnitLevelGroupSection: true,
    showOrgUnitGroupSection: true,
    showOrgUnitLevelSection: false
  };
  selectedOrgUnitItems: any[] = [
    { id: 'O6uvpzGd5pu', name: 'Bo', level: 3 },
    {
      id: 'OU_GROUP.AQQCxQqDxLe',
      name: 'Konta CHP',
      level: 4
    },
    {
      id: 'LEVEL-1',
      name: 'Kukuna CHP',
      level: 4
    }
  ];

  onOrgUnitUpdate(orgUnitObject, action) {
    this.orgUnitObject = orgUnitObject;
    this.action = action;
  }
}
