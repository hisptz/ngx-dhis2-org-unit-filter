import { Action } from '@ngrx/store';
import { OrgUnitGroup } from '../../models';
export enum OrgUnitGroupActionsTypes {
  LoadOrgUnitGroup = '[OrgUnitGroup] load organisation unit group',
  LoadOrgUnitGroupFail = '[OrgUnitGroup] load organisation unit group fail',
  AddOrgUnitGroup = '[OrgUnitGroup] add organisation unit group'
}

export class LoadOrgUnitGroupAction implements Action {
  readonly type = OrgUnitGroupActionsTypes.LoadOrgUnitGroup;
}

export class AddOrgUnitGroupAction implements Action {
  readonly type = OrgUnitGroupActionsTypes.AddOrgUnitGroup;
  constructor(public OrgUnitGroups: OrgUnitGroup[]) {}
}

export class LoadOrgUnitGroupFailAction implements Action {
  readonly type = OrgUnitGroupActionsTypes.LoadOrgUnitGroupFail;
  constructor(public error: any) {}
}

export type OrgUnitGroupActions =
  | LoadOrgUnitGroupAction
  | AddOrgUnitGroupAction
  | LoadOrgUnitGroupFailAction;
