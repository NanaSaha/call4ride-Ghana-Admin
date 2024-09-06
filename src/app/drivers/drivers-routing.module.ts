// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class DriversRoutingModule { }

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DriversComponent } from "./drivers.component";

const routes: Routes = [
  {
    path: "",
    component: DriversComponent,
    data: {
      title: "drivers",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversRoutingModule {}
export const routedComponents = [DriversComponent];
