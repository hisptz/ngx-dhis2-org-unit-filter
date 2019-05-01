import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { OrgUnitGroup } from '../../models/org-unit-group.model';
import { OrgUnitGroupService } from '../../services/org-unit-group.service';
import {
  AddOrgUnitGroupsAction,
  InitiateOrgUnitGroupsAction,
  LoadOrgUnitGroupsFailAction,
  OrgUnitGroupActionsTypes
} from '../actions/org-unit-group.actions';
import { OrgUnitFilterState } from '../reducers/org-unit-filter.reducer';
import { getOrgUnitGroupLoadInitiated } from '../selectors/org-unit-group.selectors';

@Injectable()
export class OrgUnitGroupEffects {
  constructor(
    private actions$: Actions,
    private store: Store<OrgUnitFilterState>,
    private orgUnitGroupService: OrgUnitGroupService
  ) {}

  @Effect({ dispatch: false })
  loadOrgUnitGroups$: Observable<any> = this.actions$.pipe(
    ofType(OrgUnitGroupActionsTypes.LoadOrgUnitGroups),
    withLatestFrom(this.store.select(getOrgUnitGroupLoadInitiated)),
    tap(([action, loadInitiated]: [InitiateOrgUnitGroupsAction, boolean]) => {
      if (!loadInitiated) {
        this.store.dispatch(new InitiateOrgUnitGroupsAction());
        this.orgUnitGroupService.loadAll().subscribe(
          (orgUnitGroups: OrgUnitGroup[]) => {
            this.store.dispatch(new AddOrgUnitGroupsAction(orgUnitGroups));
          },
          (error: any) => {
            this.store.dispatch(new LoadOrgUnitGroupsFailAction(error));
          }
        );
      }
    })
  );
}
