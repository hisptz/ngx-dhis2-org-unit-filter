import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  OrgUnitLevelState,
  orgUnitLevelReducer
} from './org-unit-level.reducer';

export interface OrgUnitFilterState {
  orgUnitLevel: OrgUnitLevelState;
}

export const orgUnitFilterReducer: ActionReducerMap<OrgUnitFilterState> = {
  orgUnitLevel: orgUnitLevelReducer
};

export const getOrgUnitFilterState = createFeatureSelector<OrgUnitFilterState>(
  'orgUnitFilter'
);
