import { Action } from '@ngrx/store';
import { OrgUnitLevel } from '../../models';
export enum OrgUnitLevelActionsTypes {
  LoadOrgUnitLevel = '[OrgUnitLevel] load organisation unit level',
  LoadOrgUnitLevelFail = '[OrgUnitLevel] load organisation unit level fail',
  AddOrgUnitLevel = '[OrgUnitLevel] add organisation unit level'
}

export class LoadOrgUnitLevelAction implements Action {
  readonly type = OrgUnitLevelActionsTypes.LoadOrgUnitLevel;
}

export class AddOrgUnitLevelAction implements Action {
  readonly type = OrgUnitLevelActionsTypes.AddOrgUnitLevel;
  constructor(public orgUnitLevels: OrgUnitLevel[]) {}
}

export class LoadOrgUnitLevelFailAction implements Action {
  readonly type = OrgUnitLevelActionsTypes.LoadOrgUnitLevelFail;
  constructor(public error: any) {}
}

export type OrgUnitLevelActions =
  | LoadOrgUnitLevelAction
  | AddOrgUnitLevelAction
  | LoadOrgUnitLevelFailAction;
