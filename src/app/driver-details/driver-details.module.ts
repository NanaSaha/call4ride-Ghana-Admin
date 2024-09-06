import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverDetailsRoutingModule } from './driver-details-routing.module';
import { DriverDetailsComponent } from "./driver-details.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DriverDetailsRoutingModule
  ]
})
export class DriverDetailsModule { }
export const routedComponents = [DriverDetailsComponent];

