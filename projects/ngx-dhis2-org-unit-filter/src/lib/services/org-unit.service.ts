import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import * as _ from 'lodash';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, tap, switchMap, mergeAll } from 'rxjs/operators';
import { OrgUnitFilterConfig } from '../models/org-unit-filter-config.model';
import { OrgUnit } from '../models/org-unit.model';
import { getUserOrgUnitIds } from '../helpers/get-user-org-unit-ids.helper';
import { getOrgUnitUrls } from '../helpers/get-org-unit-urls.helper';

@Injectable()
export class OrgUnitService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadAll(orgUnitFilterConfig: OrgUnitFilterConfig): Observable<OrgUnit[]> {
    return this.httpClient.me().pipe(
      mergeMap((userInfo: any) => {
        const userOrgUnits = getUserOrgUnitIds(
          userInfo,
          orgUnitFilterConfig.reportUse
        );
        return this._getOrgUnitLength(
          userOrgUnits,
          orgUnitFilterConfig.minLevel
        ).pipe(
          mergeMap((orgUnitLength: number) => {
            const pageSize = 5000;
            const pageCount = Math.ceil(orgUnitLength / pageSize);
            return from(getOrgUnitUrls(pageCount, pageSize, userOrgUnits)).pipe(
              mergeMap((orgUnitUrl: string) =>
                this._loadOrgUnitsByUrl(orgUnitUrl)
              )
            );
          })
        );
      })
    );
  }

  private _getOrgUnitLength(userOrgUnits: string[], minLevel: number) {
    return this.httpClient
      .get(
        'organisationUnits.json?fields=!:all&pageSize=1&filter=path:ilike:' +
          userOrgUnits.join(';') +
          (minLevel ? '&filter=level:le:' + minLevel : '')
      )
      .pipe(map((res: any) => res && res.pager.total));
  }

  private _loadOrgUnitsByUrl(orgUnitUrl: string) {
    return this.httpClient
      .get(orgUnitUrl)
      .pipe(map((orgUnitResult: any) => orgUnitResult.organisationUnits));
  }
}
