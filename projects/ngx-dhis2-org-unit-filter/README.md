# DHIS2 Organisation unit filter

Orgasisation unit filter module for dhis2 applications based on angular 6+

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
<ngx-dhis2-org-unit-filter></ngx-dhis2-org-unit-filter>
```

Inputs

| Input                | Description                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| selectedOrgUnitItems | This is a list of selected organisation units, groups, or levels                  |
| orgUnitFilterConfig  | This when passed overrides default configuration for the organisation unit filter |

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
