import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  OrgUnitLevelState,
  orgUnitLevelReducer
} from './org-unit-level.reducer';
import {
  OrgUnitGroupState,
  OrgUnitGroupReducer
} from './org-unit-group.reducer';

export interface OrgUnitFilterState {
  orgUnitLevel: OrgUnitLevelState;
  orgUnitGroup: OrgUnitGroupState;
}

export const orgUnitFilterReducer: ActionReducerMap<OrgUnitFilterState> = {
  orgUnitLevel: orgUnitLevelReducer,
  orgUnitGroup: OrgUnitGroupReducer
};

export const getOrgUnitFilterState = createFeatureSelector<OrgUnitFilterState>(
  'orgUnitFilter'
);
