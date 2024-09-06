import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent } from "./users.component";

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    data: {
      title: "users",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
export const routedComponents = [UsersComponent];




// import { NgModule } from "@angular/core";
// import { Routes, RouterModule } from "@angular/router";
// import { DriversComponent } from "./drivers.component";

// const routes: Routes = [
//   {
//     path: "",
//     component: DriversComponent,
//     data: {
//       title: "drivers",
//     },
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class DriversRoutingModule { }
// export const routedComponents = [DriversComponent];