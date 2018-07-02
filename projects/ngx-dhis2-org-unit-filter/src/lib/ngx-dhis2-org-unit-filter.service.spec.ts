import { TestBed, inject } from '@angular/core/testing';

import { NgxDhis2OrgUnitFilterService } from './ngx-dhis2-org-unit-filter.service';

describe('NgxDhis2OrgUnitFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxDhis2OrgUnitFilterService]
    });
  });

  it('should be created', inject([NgxDhis2OrgUnitFilterService], (service: NgxDhis2OrgUnitFilterService) => {
    expect(service).toBeTruthy();
  }));
});
