import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommissionComponent } from "./commission.component";

const routes: Routes = [
  {
    path: "",
    component: CommissionComponent,
    data: {
      title: "commission",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommissionRoutingModule { }
export const routedComponents = [CommissionComponent];

