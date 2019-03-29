import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { OrgUnit } from '../../models/org-unit.model';
import { OrgUnitService } from '../../services/org-unit.service';
import {
  AddOrgUnitsAction,
  LoadOrgUnitsAction,
  LoadOrgUnitsFailAction,
  LoadOrgUnitsInitiatedAction,
  OrgUnitActionsTypes
} from '../actions/org-unit.actions';
import { OrgUnitFilterState } from '../reducers';
import { getOrgUnitLoadingInitiated } from '../selectors/org-unit.selectors';

@Injectable()
export class OrgUnitEffects {
  constructor(
    private actions$: Actions,
    private store: Store<OrgUnitFilterState>,
    private orgUnitService: OrgUnitService
  ) {}

  @Effect({ dispatch: false })
  loadOrgUnits$: Observable<any> = this.actions$.pipe(
    ofType(OrgUnitActionsTypes.LoadOrgUnits),
    withLatestFrom(this.store.select(getOrgUnitLoadingInitiated)),
    tap(([action, orgUnitLoadingInitiated]: [LoadOrgUnitsAction, boolean]) => {
      if (!orgUnitLoadingInitiated) {
        this.store.dispatch(new LoadOrgUnitsInitiatedAction());
        this.orgUnitService.loadAll(action.orgUnitFilterConfig).subscribe(
          (OrgUnits: OrgUnit[]) => {
            this.store.dispatch(new AddOrgUnitsAction(OrgUnits));
          },
          (error: any) => {
            this.store.dispatch(new LoadOrgUnitsFailAction(error));
          }
        );
      }
    })
  );
}
