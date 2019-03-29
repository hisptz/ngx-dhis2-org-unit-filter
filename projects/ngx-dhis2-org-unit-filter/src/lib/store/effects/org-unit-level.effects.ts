import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { OrgUnitLevel } from '../../models/index';
import { OrgUnitLevelService } from '../../services/org-unit-level.service';
import {
  AddOrgUnitLevelsAction,
  InitiateOrgUnitLevelsAction,
  LoadOrgUnitLevelsFailAction,
  OrgUnitLevelActionsTypes
} from '../actions/index';
import { OrgUnitFilterState } from '../reducers/index';
import { getOrgUnitLevelLoadInitiated } from '../selectors/index';

@Injectable()
export class OrgUnitLevelEffects {
  @Effect({ dispatch: false })
  loadOrgUnitLevels$: Observable<any> = this.actions$.pipe(
    ofType(OrgUnitLevelActionsTypes.LoadOrgUnitLevels),
    withLatestFrom(this.store.select(getOrgUnitLevelLoadInitiated)),
    tap(([action, loadInitiated]: [InitiateOrgUnitLevelsAction, boolean]) => {
      if (!loadInitiated) {
        this.store.dispatch(new InitiateOrgUnitLevelsAction());
        this.orgUnitLevelService.loadAll().subscribe(
          (orgUnitLevels: OrgUnitLevel[]) => {
            this.store.dispatch(new AddOrgUnitLevelsAction(orgUnitLevels));
          },
          (error: any) => {
            this.store.dispatch(new LoadOrgUnitLevelsFailAction(error));
          }
        );
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<OrgUnitFilterState>,
    private orgUnitLevelService: OrgUnitLevelService
  ) {}
}
