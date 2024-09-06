import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RidersRoutingModule } from './riders-routing.module';
import { RidersComponent } from './riders.component';


@NgModule({
  declarations: [RidersComponent],
  imports: [
    CommonModule,
    RidersRoutingModule
  ]
})
export class RidersModule { }
