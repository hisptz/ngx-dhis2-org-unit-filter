import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { containers } from './containers/index';
import { components } from './components/index';
import { orgUnitFilterReducer } from './store/reducers';
import { orgUnitFilterEffects } from './store/effects';

@NgModule({
  imports: [
    StoreModule.forFeature('orgUnitFilter', orgUnitFilterReducer),
    EffectsModule.forFeature(orgUnitFilterEffects)
  ],
  declarations: [...containers, ...components],
  exports: [...containers]
})
export class NgxDhis2OrgUnitFilterModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxDhis2OrgUnitFilterModule,
      providers: []
    };
  }
}
