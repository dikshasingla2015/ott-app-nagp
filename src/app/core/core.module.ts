import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule
  ],
  exports: [
    AuthGuard
  ],
  providers:[
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
