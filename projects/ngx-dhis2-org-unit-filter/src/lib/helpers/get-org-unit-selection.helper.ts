import { getSanitizedSelectedOrgUnits } from './get-sanitized-selected-org-units.helper';

export function getOrgUnitSelection(selectedOrgUnitItems: any[]) {
  return {
    dimension: 'ou',
    items: getSanitizedSelectedOrgUnits(selectedOrgUnitItems),
    changed: true
  };
}
