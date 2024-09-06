import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RidersComponent } from "./riders.component";

const routes: Routes = [
  {
    path: "",
    component: RidersComponent,
    data: {
      title: "riders",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidersRoutingModule {}
export const routedComponents = [RidersComponent];
