import * as _ from 'lodash';
export function getUserOrgUnitIds(userInfo: any) {
  return _.uniq(
    _.map(
      [
        ...userInfo.organisationUnits,
        ...(userInfo.dataViewOrganisationUnits || [])
      ],
      orgUnit => orgUnit.id
    )
  );
}
