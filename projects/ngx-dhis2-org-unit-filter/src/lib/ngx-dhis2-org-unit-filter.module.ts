import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { containers } from './containers/index';
import { components } from './components/index';
import { orgUnitFilterReducer } from './store/reducers/index';
import { orgUnitFilterEffects } from './store/effects/index';
import { CommonModule } from '@angular/common';
import { pipes } from './pipes/index';
import { services } from './services/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('orgUnitFilter', orgUnitFilterReducer),
    EffectsModule.forFeature(orgUnitFilterEffects)
  ],
  declarations: [...containers, ...components, ...pipes],
  providers: [...services],
  exports: [...containers]
})
export class NgxDhis2OrgUnitFilterModule {}
