import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TripsComponent } from "./trips.component";

const routes: Routes = [
  {
    path: "",
    component: TripsComponent,
    data: {
      title: "trips",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsRoutingModule {}
export const routedComponents = [TripsComponent];
