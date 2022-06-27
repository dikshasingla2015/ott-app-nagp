import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { WriteReviewComponent } from './components/write-review/write-review.component';
import { TakePrimeMembershipComponent } from './components/take-prime-membership/take-prime-membership.component';
import { TranslateModule } from '@ngx-translate/core';

const components = [
  WriteReviewComponent,
  TakePrimeMembershipComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TranslateModule
  ]
})
export class UserModule { }
