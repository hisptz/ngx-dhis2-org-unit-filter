[![Build Status](https://travis-ci.org/hisptz/ngx-dhis2-org-unit-filter.svg?branch=develop)](https://travis-ci.org/hisptz/ngx-dhis2-org-unit-filter) [![Greenkeeper badge](https://badges.greenkeeper.io/interactive-apps/ngx-dhis2-org-unit-filter.svg)](https://greenkeeper.io/)

# DHIS2 Organisation unit selection filter

Organisation unit selection filter module for DHIS2 applications based on angular 6+

## installation

`npm install @hisptz/ngx-dhis2-org-unit-filter`

## Usage

If the module is to be imported in the app.module or any other feature module, then import as

`import { NgxDhis2OrgUnitFilterModule } from '@hisptz/ngx-dhis2-org-unit-filter';`

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
