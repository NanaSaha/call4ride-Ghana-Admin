
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PricingnewComponent } from "./pricingnew.component";

const routes: Routes = [
  {
    path: "",
    component: PricingnewComponent,
    data: {
      title: "pricingNew",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricingnewRoutingModule { }
export const routedComponents = [PricingnewComponent];

