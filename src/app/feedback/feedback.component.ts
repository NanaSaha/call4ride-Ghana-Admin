import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ProfileService } from "../shared/services/profile.service";
import { Router } from "@angular/router";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs/Observable";

import { map } from "rxjs/operators";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FeedbackComponent implements OnInit {
  submitted: boolean = false;
  form: any;
  driverEmail: any;
  username: any;
  isDecided: boolean = false;
  id: any;
  message: any;
  isDecider2: boolean = false;
  public items: any;
  dataSource: any;
  closeResult: string;

  constructor(
    public ph: ProfileService,
    public router: Router,
    private modalService: NgbModal
  ) {
    console.log("RIDERS COMPOENT");
  }

  ngOnInit() {
    console.log("FEEDUSER PROFILE::", this.ph._getFeedUserProfile());

    // this.ph
    //   ._getFeedUserProfile()
    //   .snapshotChanges()
    //   .subscribe((res) => {
    //     console.log("SNAPSHOT DATA::::", res);

    //     this.items = [];
    //     res.forEach((snap) => {
    //       console.log("SNAPSHOT KEY:::", snap.key);
    //       console.log("SNAPSHOT VALUE:::", snap.value());

    //       this.items.push({
    //         Client_Message: snap.Client_Message,
    //       });
    //       this.items;
    //       console.log("ITEM LISTSS::: ", this.items);
    //       return false;
    //     });
    //   });

    this.ph
      ._getFeedUserProfile()
      .valueChanges()
      .subscribe((res) => {
        console.log("SNAP SHOT:::", res);
        this.items = [];

        res.forEach((snap) => {
          console.log("ONLY SNAP:::", snap);

          this.dataSource = []; //For values
          let dataKeys = []; //For keys

          for (let key in snap) {
            console.log("KEYS IN SNAP:::", key);
            this.dataSource.push(snap[key]);
            dataKeys.push(key);
            console.log("PUSHING KEYS:::", dataKeys.push(key));
          }

          for (let d of this.dataSource) {
            console.log("Data Values", d);
          }

          // this.items.push({
          //   client_key: snap.key,
          //   Client_Message: snap.val().Client_Message,
          // });
          // this.items;
          console.log("DATASOURCE:::", this.dataSource);

          return false;
        });
      });
  }

  // ngOnInit() {
  //   this.ph._getFeedUserProfile().on("value", (snapshot) => {
  //     console.log("SNAP SHOT:::", snapshot.val());
  //     this.items = [];

  //     snapshot.forEach((snap) => {
  //       console.log("ONLY SNAP:::", snap);
  //       console.log("KEY:::", snap.key);
  //       console.log("SNAP Message:::", snap.val());

  //       this.dataSource = []; //For values
  //       let dataKeys = []; //For keys

  //       for (let key in snap.val()) {
  //         //Pay attention to the 'in'
  //         this.dataSource.push(snap.val()[key]);
  //         dataKeys.push(key);
  //       }

  //       for (let d of this.dataSource) {
  //         console.log("Data Values", d);
  //       }

  //       this.items.push({
  //         client_key: snap.key,
  //         Client_Message: snap.val().Client_Message,
  //       });
  //       this.items;
  //       console.log("DATASOURCE:::", this.dataSource);

  //       return false;
  //     });
  //   });
  // }
}
