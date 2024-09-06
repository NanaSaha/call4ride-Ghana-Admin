import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverDetailsComponent } from "./driver-details.component";



const routes: Routes = [
  {
    path: "",
    component: DriverDetailsComponent,
    data: {
      title: "driver-details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverDetailsRoutingModule { }
