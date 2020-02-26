import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import * as _ from 'lodash';
import { from, Observable, of } from 'rxjs';
import {
  map,
  mergeMap,
  tap,
  switchMap,
  mergeAll,
  catchError
} from 'rxjs/operators';
import { OrgUnitFilterConfig } from '../models/org-unit-filter-config.model';
import { OrgUnit } from '../models/org-unit.model';
import { getUserOrgUnitIds } from '../helpers/get-user-org-unit-ids.helper';
import { getOrgUnitUrls } from '../helpers/get-org-unit-urls.helper';

@Injectable()
export class OrgUnitService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadAll(orgUnitFilterConfig: OrgUnitFilterConfig): Observable<OrgUnit[]> {
    const pageSize = orgUnitFilterConfig.batchSize || 500;
    return this.httpClient
      .get('organisationUnits.json', {
        useIndexDb: true,
        fetchOnlineIfNotExist: false
      })
      .pipe(
        catchError(() => of({ organisationUnits: [] })),
        switchMap((indexDBResponse: any) => {
          const indexDBOrgUnits = indexDBResponse
            ? indexDBResponse.organisationUnits || []
            : [];

          return indexDBOrgUnits.length > 0
            ? of(indexDBOrgUnits)
            : this.httpClient.me().pipe(
                mergeMap((userInfo: any) => {
                  const userOrgUnits = getUserOrgUnitIds(
                    userInfo,
                    orgUnitFilterConfig.reportUse
                  );

                  return this._getInitialOrgUnits(
                    userOrgUnits,
                    pageSize,
                    orgUnitFilterConfig.minLevel
                  ).pipe(
                    mergeMap((orgUnitResponse: any) => {
                      const orgUnitLength =
                        orgUnitResponse && orgUnitResponse.pager
                          ? orgUnitResponse.pager.total
                          : 0;

                      if (orgUnitLength === 0) {
                        return of([]);
                      }

                      const pageCount = Math.ceil(orgUnitLength / pageSize);

                      return from(
                        getOrgUnitUrls(
                          userOrgUnits,
                          pageCount,
                          pageSize,
                          orgUnitFilterConfig.minLevel
                        )
                      ).pipe(
                        mergeMap((orgUnitUrl: string, index: number) => {
                          return index === 0
                            ? of(orgUnitResponse.organisationUnits || [])
                            : this._loadOrgUnitsByUrl(orgUnitUrl);
                        })
                      );
                    })
                  );
                })
              );
        })
      );
  }

  private _getInitialOrgUnits(
    userOrgUnits: string[],
    pageSize: number,
    minLevel: number
  ) {
    return this.httpClient.get(
      'organisationUnits.json?fields=id,name,level,path,parent&order=level:asc' +
        '&order=name:asc&filter=path:ilike:' +
        userOrgUnits.join(';') +
        '&pageSize=' +
        pageSize +
        (minLevel ? '&filter=level:le:' + minLevel : ''),
      { useIndexDb: true }
    );
  }

  private _loadOrgUnitsByUrl(orgUnitUrl: string) {
    return this.httpClient
      .get(orgUnitUrl, {
        useIndexDb: true
      })
      .pipe(
        map((orgUnitResult: any) => {
          return orgUnitResult.organisationUnits;
        })
      );
  }
}
