import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  OrgUnitFilterState,
  getOrgUnitFilterState
} from '../reducers/org-unit-filter.reducer';
import {
  selectAllOrgUnitGroups,
  getOrgUnitGroupLoadingState,
  getOrgUnitGroupLoadInitiatedState
} from '../reducers/org-unit-group.reducer';
import { OrgUnitGroup } from '../../models/org-unit-group.model';

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
