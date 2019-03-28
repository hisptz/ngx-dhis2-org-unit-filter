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
  selectedOrgUnitItems: any[] = [
    { id: 'kbPmt60yi0L', name: 'Bramaia', level: 3, type: 'ORGANISATION_UNIT' },
    {
      id: 'AQQCxQqDxLe',
      name: 'Konta CHP',
      level: 4,
      type: 'ORGANISATION_UNIT'
    },
    {
      id: 'M9JyYBZTqR7',
      name: 'Kukuna CHP',
      level: 4,
      type: 'ORGANISATION_UNIT'
    }
  ];

  onOrgUnitUpdate(orgUnitObject, action) {
    this.orgUnitObject = orgUnitObject;
    this.action = action;
  }
}
