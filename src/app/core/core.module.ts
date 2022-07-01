import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: any) {
    if (targetModule) {
      console.error("Module already imported");
      throw new Error(`${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`);
    }
  }
}

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
  ],
  providers:[
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
