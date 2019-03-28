import { createSelector, MemoizedSelector } from '@ngrx/store';
import { OrgUnitFilterState, getOrgUnitFilterState } from '../reducers';
import {
  selectAllOrgUnitGroups,
  OrgUnitGroupState,
  getOrgUnitGroupLoadingState,
  getOrgUnitGroupLoadInitiatedState
} from '../reducers/org-unit-group.reducer';
import { OrgUnitGroup } from '../../models';

export const getOrgUnitGroupState = createSelector(
  getOrgUnitFilterState,
  (state: OrgUnitFilterState) => state.orgUnitGroup
);

export const getOrgUnitGroupLoading = createSelector(
  getOrgUnitGroupState,
  getOrgUnitGroupLoadingState
);

export const getOrgUnitGroupLoadInitiated = createSelector(
  getOrgUnitGroupState,
  getOrgUnitGroupLoadInitiatedState
);
export const getOrgUnitGroups = createSelector(
  getOrgUnitGroupState,
  selectAllOrgUnitGroups
);

export const getOrgUnitGroupBasedOnOrgUnitsSelected = (
  selectedOrgUnits: any[]
) =>
  createSelector(
    getOrgUnitGroups,
    (orgUnitGroups: OrgUnitGroup[]) => {
      return (orgUnitGroups || []).map((orgUnitGroup: OrgUnitGroup) => {
        return {
          ...orgUnitGroup,
          selected: (selectedOrgUnits || []).some(
            (selectedOrgUnit: any) =>
              selectedOrgUnit.id === 'OU_GROUP-' + orgUnitGroup.id
          )
        };
      });
    }
  );
