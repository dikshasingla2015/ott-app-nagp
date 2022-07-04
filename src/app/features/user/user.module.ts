import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { TakePrimeMembershipComponent } from './components/take-prime-membership/take-prime-membership.component';
import { ViewFavoritesListComponent } from './components/view-favorites-list/view-favorites-list.component';
import { ViewWatchedListComponent } from './components/view-watched-list/view-watched-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [
  TakePrimeMembershipComponent,
  ViewFavoritesListComponent,
  ViewWatchedListComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  exports:[
  ]
})
export class UserModule { }
