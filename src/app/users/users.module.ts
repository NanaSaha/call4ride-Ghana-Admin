import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }



// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { PricingRoutingModule } from './pricing-routing.module';
// import { PricingComponent } from './pricing.component';


// @NgModule({
//   declarations: [PricingComponent],
//   imports: [
//     CommonModule,
//     PricingRoutingModule
//   ]
// })
// export class PricingModule { }

