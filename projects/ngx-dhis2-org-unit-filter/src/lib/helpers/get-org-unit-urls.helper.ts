import * as _ from 'lodash';
export function getOrgUnitUrls(
  pageCount: number,
  pageSize: number,
  userOrgUnits: any
) {
  return _.map(
    _.range(1, pageCount + 1),
    pageNumber =>
      'organisationUnits.json?fields=id,name,level,created,lastUpdated,' +
      'path&page=' +
      pageNumber +
      '&pageSize=' +
      pageSize +
      '&order=level:asc&order=name:asc&filter=path:ilike:' +
      userOrgUnits.join(';')
  );
}
