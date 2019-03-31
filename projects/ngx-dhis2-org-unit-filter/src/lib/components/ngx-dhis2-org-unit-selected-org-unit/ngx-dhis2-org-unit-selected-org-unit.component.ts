import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import * as _ from 'lodash';
import { CLOSE_ICON } from '../../icons';
import { OrgUnit } from '../../models';

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
  constructor() {
    this.closeIcon = CLOSE_ICON;
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
}
