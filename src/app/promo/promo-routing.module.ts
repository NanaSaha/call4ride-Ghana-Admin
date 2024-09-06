import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PromoComponent } from "./promo.component";

const routes: Routes = [
  {
    path: "",
    component: PromoComponent,
    data: {
      title: "promo",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoRoutingModule {}
export const routedComponents = [PromoComponent];
