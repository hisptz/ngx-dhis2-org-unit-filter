import { OrgUnit } from '../models';

export const USER_ORG_UNITS: OrgUnit[] = [
  {
    id: 'USER_ORGUNIT',
    name: 'User Org-unit',
    type: 'USER_ORGANISATION_UNIT',
    level: 1
  },
  {
    id: 'USER_ORGUNIT_CHILDREN',
    name: 'User Sub-units',
    type: 'USER_ORGANISATION_UNIT',
    level: 2
  },
  {
    id: 'USER_ORGUNIT_GRANDCHILDREN',
    name: 'User sub-x2-units',
    type: 'USER_ORGANISATION_UNIT',
    level: 3
  }
];
