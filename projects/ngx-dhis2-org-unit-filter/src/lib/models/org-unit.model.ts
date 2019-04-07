export interface OrgUnit {
  id: string;
  name: string;
  level?: number;
  path?: string;
  selected?: boolean;
  children?: string[];
  type?: string;
  icon?: string;
  description?: string;
}
