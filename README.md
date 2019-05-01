[![Build Status](https://travis-ci.org/interactive-apps/ngx-dhis2-org-unit-filter.svg?branch=develop)](https://travis-ci.org/interactive-apps/ngx-dhis2-org-unit-filter)
[![dependencies Status](https://david-dm.org/interactive-apps/ngx-dhis2-org-unit-filter/status.svg)](https://david-dm.org/interactive-apps/ngx-dhis2-org-unit-filter)
[![devDependencies Status](https://david-dm.org/interactive-apps/ngx-dhis2-org-unit-filter/dev-status.svg)](https://david-dm.org/interactive-apps/ngx-dhis2-org-unit-filter?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Maintainability](https://api.codeclimate.com/v1/badges/3a8da71e235a0e397823/maintainability)](https://codeclimate.com/github/interactive-apps/ngx-dhis2-org-unit-filter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3a8da71e235a0e397823/test_coverage)](https://codeclimate.com/github/interactive-apps/ngx-dhis2-org-unit-filter/test_coverage) [![Greenkeeper badge](https://badges.greenkeeper.io/interactive-apps/ngx-dhis2-org-unit-filter.svg)](https://greenkeeper.io/)

# DHIS2 Organisation unit selection filter

Organisation unit selection filter module for DHIS2 applications based on angular 6+

## installation

`npm install @iapps/ngx-dhis2-org-unit-filter`

## Usage

If the module is to be imported in the app.module or any other feature module, then import as

`import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';`

then add this in the imports

```
imports: [
    ...
    NgxDhis2OrgUnitFilterModule,
    ...
    ]
```

Once imported, orgunitfilter can be called in as

```
<ngx-dhis2-org-unit-filter
    [orgUnitFilterConfig]="orgUnitFilterConfig"
    [selectedOrgUnitItems]="selectedOrgUnitItems"
    (orgUnitUpdate)="onOrgUnitUpdate($event, 'UPDATE')"
    (orgUnitClose)="onOrgUnitUpdate($event, 'CLOSE')">
</ngx-dhis2-org-unit-filter>
```

Inputs

| Input                | Description                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| selectedOrgUnitItems | This is a list of selected organisation units, groups, or levels                  |
| orgUnitFilterConfig  | This when passed overrides default configuration for the organisation unit filter |

Input models

selectedOrgUnitItems

| Item             | Description                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| id               | Organisation unit identifier                                                                                      |
| name (optional)  | Organisation unit name                                                                                            |
| level (optional) | Level of organisation unit in the hierarchy eg. 1, 2                                                              |
| type (optional)  | Type of organisation unit eg. USER_ORGANISATIONUNIT, ORGANISATION_LEVEL, ORGANISATIONUNIT_GROUP, ORGANISATIONUNIT |

orgUnitFilterConfig

| Item                      | Description                                                           | Default value |
| ------------------------- | --------------------------------------------------------------------- | ------------- |
| singleSelection           | Specify whether org unit selection is single or multiple              | true          |
| reportUse (optional)      | Tells whether org units should be used for reports or data entry      | true          |
| minLevel (optional)       | Specify minimum level for org units                                   | none          |
| updateOnSelect (optional) | Specify whether to update on select or unselect or on button click    | false         |
| closeOnDestroy (optional) | Call on closeOrgUnit Method when component get destroyed, if set true | true          |

Outputs

| Output        | Description                                   |
| ------------- | --------------------------------------------- |
| orgUnitUpdate | This is emitted when UPDATE button is clicked |
| orgUnitClose  | This is emitted when CLOSE button is clicked  |

Sample output

```
{
  "dimension": "ou",
  "items": [
    {
      "id": "PMa2VCrupOd",
      "name": "Kambia",
      "level": 2,
      "type": "ORGANISATION_UNIT"
    },
    {
      "id": "at6UHUQatSo",
      "name": "Western Area",
      "level": 2,
      "type": "ORGANISATION_UNIT"
    },
    {
      "id": "TEQlaapDQoK",
      "name": "Port Loko",
      "level": 2,
      "type": "ORGANISATION_UNIT"
    }
  ]
}
```
