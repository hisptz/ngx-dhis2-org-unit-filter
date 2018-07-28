export interface OrgUnitFilterConfig {
  /**
   * Tells whether org units should be used for reports or data entry
   */
  reportUse: boolean;

  /**
   * Specify minimum level for org units
   */
  minLevel?: number;
}
