import { ModuleWithProviders, NgModule } from '@angular/core';
import { containers } from './containers/index';
import { components } from './components/index';

@NgModule({
  imports: [
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
