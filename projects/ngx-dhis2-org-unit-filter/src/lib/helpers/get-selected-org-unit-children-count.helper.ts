export function getSelectedOrgUnitChildrenCount(
  orgUnitChildrenIds: string[],
  selectedOrgUnits: any[]
) {
  return (orgUnitChildrenIds || []).filter(orgUnitChildId =>
    selectedOrgUnits.find(
      (selectedOrgUnit: any) => selectedOrgUnit.id === orgUnitChildId
    )
  ).length;
}
