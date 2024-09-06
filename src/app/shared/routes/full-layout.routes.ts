import { Routes, RouterModule } from "@angular/router";
// import { DriverDetailsComponent } from "app/driver-details/driver-details.component";

//Route for content layout with sidebar, navbar and footer.
// import { NewUserComponent } from './new-user/new-user.component';

export const Full_ROUTES: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("../../dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "riders",
    loadChildren: () =>
      import("../../riders/riders.module").then((m) => m.RidersModule),
  },
  {
    path: "drivers",
    loadChildren: () =>
      import("../../drivers/drivers.module").then((m) => m.DriversModule),
  },
  {
    path: "campaign",
    loadChildren: () =>
      import("../../campaign/campaign.module").then((m) => m.CampaignModule),
  },
  {
    path: "trips",
    loadChildren: () =>
      import("../../trips/trips.module").then((m) => m.TripsModule),
  },
  {
    path: "subscriptions",
    loadChildren: () =>
      import("../../subscriptions/subscriptions.module").then(
        (m) => m.SubscriptionsModule
      ),
  },

  {
    path: "driver-details",
    loadChildren: () =>
      import("../../driver-details/driver-details.module").then(
        (m) => m.DriverDetailsModule
      ),
  },

  {
    path: "feedback",
    loadChildren: () =>
      import("../../feedback/feedback.module").then((m) => m.FeedbackModule),
  },
  {
    path: "promo",
    loadChildren: () =>
      import("../../promo/promo.module").then((m) => m.PromoModule),
  },
  {
    path: "pricing",
    loadChildren: () =>
      import("../../pricing/pricing.module").then((m) => m.PricingModule),
  },
  {
    path: "new-user",
    loadChildren: () =>
      import("../../new-user/new-user.module").then((m) => m.NewUserModule),
  },
  {
    path: "pricingnew",
    loadChildren: () =>
      import("../../pricingnew/pricingnew.module").then((m) => m.PricingnewModule),
  },

  {
    path: "users",
    loadChildren: () =>
      import("../../users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "pricingnew/:id",
    loadChildren: () =>
      import("../../pricingnew/pricingnew.module").then((m) => m.PricingnewModule),
  },
 
  {
    path: "commission",
    loadChildren: () =>
      import("../../commission/commission.module").then((m) => m.CommissionModule),
  },

  {
    path: "calendar",
    loadChildren: () =>
      import("../../calendar/calendar.module").then((m) => m.CalendarsModule),
  },
  {
    path: "charts",
    loadChildren: () =>
      import("../../charts/charts.module").then((m) => m.ChartsNg2Module),
  },
  {
    path: "forms",
    loadChildren: () =>
      import("../../forms/forms.module").then((m) => m.FormModule),
  },
  {
    path: "maps",
    loadChildren: () =>
      import("../../maps/maps.module").then((m) => m.MapsModule),
  },
  {
    path: "tables",
    loadChildren: () =>
      import("../../tables/tables.module").then((m) => m.TablesModule),
  },
  {
    path: "datatables",
    loadChildren: () =>
      import("../../data-tables/data-tables.module").then(
        (m) => m.DataTablesModule
      ),
  },
  {
    path: "uikit",
    loadChildren: () =>
      import("../../ui-kit/ui-kit.module").then((m) => m.UIKitModule),
  },
  {
    path: "components",
    loadChildren: () =>
      import("../../components/ui-components.module").then(
        (m) => m.UIComponentsModule
      ),
  },
  {
    path: "pages",
    loadChildren: () =>
      import("../../pages/full-pages/full-pages.module").then(
        (m) => m.FullPagesModule
      ),
  },
  {
    path: "cards",
    loadChildren: () =>
      import("../../cards/cards.module").then((m) => m.CardsModule),
  },
  {
    path: "chat",
    loadChildren: () =>
      import("../../chat/chat.module").then((m) => m.ChatModule),
  },
  {
    path: "chat-ngrx",
    loadChildren: () =>
      import("../../chat-ngrx/chat-ngrx.module").then((m) => m.ChatNGRXModule),
  },
  {
    path: "inbox",
    loadChildren: () =>
      import("../../inbox/inbox.module").then((m) => m.InboxModule),
  },
  {
    path: "taskboard",
    loadChildren: () =>
      import("../../taskboard/taskboard.module").then((m) => m.TaskboardModule),
  },
  {
    path: "taskboard-ngrx",
    loadChildren: () =>
      import("../../taskboard-ngrx/taskboard-ngrx.module").then(
        (m) => m.TaskboardNGRXModule
      ),
  },
];
