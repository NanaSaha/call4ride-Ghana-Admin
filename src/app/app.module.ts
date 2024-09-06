import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from "@ngrx/store";
import { DragulaService } from "ng2-dragula";
import { NgxSpinnerModule } from "ngx-spinner";

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import * as fromApp from "./store/app.reducer";
import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from "./shared/auth/auth.service";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { WINDOW_PROVIDERS } from "./shared/services/window.service";
import { ProfileService } from "./shared/services/profile.service";
import { TripsComponent } from "./trips/trips.component";
import { PromoComponent } from "./promo/promo.component";
import { FeedbackComponent } from "./feedback/feedback.component";

import { map, filter, switchMap } from "rxjs/operators";
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { DriverDetailsModule } from './driver-details/driver-details.module';
import { CampaignComponent } from './campaign/campaign.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricingnewComponent } from './pricingnew/pricingnew.component';
import { CommissionComponent } from './commission/commission.component';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';

var firebaseConfig = {
  // apiKey: "AIzaSyApjpwWIXFsAn6WWgauNG93bHdAY126eVw",
  // authDomain: "ghana-c4r.firebaseapp.com",
  // projectId: "ghana-c4r",
  // storageBucket: "ghana-c4r.appspot.com",
  // databaseURL: "https://ghana-c4r-default-rtdb.firebaseio.com",
  // messagingSenderId: "516821551729",
  // appId: "1:516821551729:web:04f1a30ca01b8acc9d29d0",
  // measurementId: "G-2Y04YP8P7Q"

  apiKey: "AIzaSyDtQGdYGuIQ7f-r9JqWBBj7q6RJJ9595nI",
  authDomain: "call4ride-2fe35.firebaseapp.com",
  projectId: "call4ride-2fe35",
  storageBucket: "call4ride-2fe35.appspot.com",
  databaseURL: "https://call4ride-2fe35-default-rtdb.firebaseio.com",
  messagingSenderId: "1092796986980",
  appId: "1:1092796986980:web:24d071186167016803d171",
  measurementId: "G-EPD48CQC9J"
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    TripsComponent,
    PromoComponent,
    FeedbackComponent,
    DriverDetailsComponent,
    CampaignComponent,
    PricingnewComponent,
    CommissionComponent,
    NewUserComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAP_API_KEY",
    }),
    PerfectScrollbarModule,
    DriverDetailsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    DragulaService,
    ProfileService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    WINDOW_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
