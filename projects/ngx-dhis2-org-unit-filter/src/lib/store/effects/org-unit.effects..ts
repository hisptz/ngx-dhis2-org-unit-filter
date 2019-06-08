import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';

import { OrgUnit } from '../../models/org-unit.model';
import { OrgUnitService } from '../../services/org-unit.service';
import {
  addOrgUnits,
  initiateOrgUnits,
  loadOrgUnitFail,
  loadOrgUnits
} from '../actions/org-unit.actions';
import { OrgUnitFilterState } from '../reducers/org-unit-filter.reducer';
import { getOrgUnitLoadingInitiated } from '../selectors/org-unit.selectors';

@Injectable()
export class OrgUnitEffects {
  loadOrgUnits$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadOrgUnits),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(this.store.select(getOrgUnitLoadingInitiated))
          )
        ),
        tap(([action, orgUnitLoadingInitiated]) => {
          if (!orgUnitLoadingInitiated) {
            this.store.dispatch(initiateOrgUnits());
            this.orgUnitService.loadAll(action.orgUnitFilterConfig).subscribe(
              (orgUnits: OrgUnit[]) => {
                this.store.dispatch(addOrgUnits({ orgUnits }));
              },
              (error: any) => {
                this.store.dispatch(loadOrgUnitFail({ error }));
              }
            );
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<OrgUnitFilterState>,
    private orgUnitService: OrgUnitService
  ) {}
}
