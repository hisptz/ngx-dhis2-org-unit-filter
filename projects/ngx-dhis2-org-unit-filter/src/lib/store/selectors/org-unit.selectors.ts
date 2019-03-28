import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import {
  getOrgUnitChildrenIds,
  updateOrgUnitListWithSelectionStatus
} from '../../helpers';
import { OrgUnit } from '../../models';
import { getOrgUnitFilterState, OrgUnitFilterState } from '../reducers';
import {
  getOrgUnitLoadedState,
  getOrgUnitLoadingInitiatedState,
  getOrgUnitLoadingState,
  selectAllOrgUnits
} from '../reducers/org-unit.reducer';

export const getOrgUnitState = createSelector(
  getOrgUnitFilterState,
  (state: OrgUnitFilterState) => state.orgUnit
);

export const getOrgUnitLoading = createSelector(
  getOrgUnitState,
  getOrgUnitLoadingState
);

export const getOrgUnitLoadingInitiated = createSelector(
  getOrgUnitState,
  getOrgUnitLoadingInitiatedState
);

export const getOrgUnitLoaded = createSelector(
  getOrgUnitState,
  getOrgUnitLoadedState
);

export const getOrgUnits = createSelector(
  getOrgUnitState,
  selectAllOrgUnits
);

export const getHighestLevelOrgUnitIds = createSelector(
  getOrgUnits,
  (orgUnits: OrgUnit[]) => {
    const sortedOrgUnits = _.sortBy(orgUnits, 'level');
    const highestLevel = sortedOrgUnits[0] ? sortedOrgUnits[0].level : 0;
    return _.map(
      _.filter(sortedOrgUnits, orgUnit => orgUnit.level === highestLevel),
      (orgUnit: OrgUnit) => orgUnit.id
    );
  }
);

export const getOrgUnitById = orgUnitId =>
  createSelector(
    getOrgUnits,
    (orgUnits: OrgUnit[]) => {
      const orgUnit = _.find(orgUnits, ['id', orgUnitId]);
      return orgUnit
        ? { ...orgUnit, children: getOrgUnitChildrenIds(orgUnits, orgUnit) }
        : null;
    }
  );

export const getTopSelectedOrgUnitLevel = selectedOrgUnits =>
  createSelector(
    getOrgUnits,
    (orgUnits: OrgUnit[]) => {
      const selectedOrgUnitsWithLevels: OrgUnit[] = _.sortBy(
        _.map(selectedOrgUnits || [], orgUnit =>
          _.find(orgUnits, ['id', orgUnit.id])
        ),
        'level'
      );

      return selectedOrgUnitsWithLevels[0]
        ? selectedOrgUnitsWithLevels[0].level
        : 0;
    }
  );

export const getUserOrgUnits = createSelector(
  getOrgUnits,
  (orgUnits: OrgUnit[]) =>
    (orgUnits || []).filter(
      (orgUnit: OrgUnit) => orgUnit && orgUnit.id.indexOf('USER_ORGUNIT') !== -1
    )
);

export const getUserOrgUnitsBasedOnOrgUnitsSelected = selectedOrgUnits =>
  createSelector(
    getUserOrgUnits,
    userOrgUnits =>
      updateOrgUnitListWithSelectionStatus(userOrgUnits, selectedOrgUnits)
  );
