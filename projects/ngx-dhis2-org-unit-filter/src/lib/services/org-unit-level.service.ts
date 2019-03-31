import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { map } from 'rxjs/operators';

@Injectable()
export class OrgUnitLevelService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadAll() {
    return this.httpClient
      .get(
        `organisationUnitLevels.json?fields=id,name,level&paging=false&order=level:asc`
      )
      .pipe(map((res: any) => res.organisationUnitLevels || []));
  }
}
