import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import * as _ from 'lodash';
import { from, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { OrgUnitFilterConfig } from '../models/org-unit-filter-config.model';
import { OrgUnit } from '../models/org-unit.model';
import { getUserOrgUnitIds } from '../helpers/get-user-org-unit-ids.helper';
import { getOrgUnitUrls } from '../helpers/get-org-unit-urls.helper';

@Injectable()
export class OrgUnitService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadAll(orgUnitFilterConfig: OrgUnitFilterConfig): Observable<OrgUnit[]> {
    return this._loadUserOrgUnits().pipe(
      mergeMap((userInfo: any) => {
        const userOrgUnits = getUserOrgUnitIds(
          userInfo,
          orgUnitFilterConfig.reportUse
        );
        return this._getOrgUnitLength(userOrgUnits, orgUnitFilterConfig).pipe(
          mergeMap((orgUnitLength: number) => {
            const pageSize = 5000;
            const pageCount = Math.ceil(orgUnitLength / pageSize);
            return from(getOrgUnitUrls(pageCount, pageSize, userOrgUnits)).pipe(
              mergeMap(
                (orgUnitUrl: string) => this._loadOrgUnitsByUrl(orgUnitUrl),
                null,
                1
              )
            );
          })
        );
      })
    );
  }

  private _getOrgUnitLength(
    userOrgUnits,
    orgUnitFilterConfig: OrgUnitFilterConfig
  ) {
    return this.httpClient
      .get(
        'organisationUnits.json?fields=!:all&pageSize=1&filter=path:ilike:' +
          userOrgUnits.join(';') +
          (orgUnitFilterConfig.minLevel
            ? '&filter=level:le:' + orgUnitFilterConfig.minLevel
            : '')
      )
      .pipe(map((res: any) => res && res.organisationUnits.length));
  }

  private _loadUserOrgUnits() {
    return this.httpClient.me();
  }

  private _loadOrgUnitsByUrl(orgUnitUrl: string) {
    return this.httpClient
      .get(orgUnitUrl)
      .pipe(map((orgUnitResult: any) => orgUnitResult.organisationUnits));
  }
}
