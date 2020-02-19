import * as _ from 'lodash';
import { OrgUnit } from '../models/org-unit.model';
export function getOrgUnitChildrenIds(
  orgUnits: OrgUnit[],
  currentOrgUnit: OrgUnit
): string[] {
  return _.map(
    _.filter(orgUnits, (orgUnit: OrgUnit) =>
      orgUnit && orgUnit.parent
        ? orgUnit.parent.id === currentOrgUnit.id
        : false
    ),
    orgUnitChild => orgUnitChild.id
  );
}
