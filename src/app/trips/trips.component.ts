import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ProfileService } from "../shared/services/profile.service";
import { Router } from "@angular/router";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-trips",
  templateUrl: "./trips.component.html",
  styleUrls: ["./trips.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TripsComponent implements OnInit {
  submitted: boolean = false;
  form: any;
  driverEmail: any;
  username: any;
  isDecided: boolean = false;
  id: any;
  message: any;
  isDecider2: boolean = false;
  public items: any;
  closeResult: string;

  eventList;
  constructor(
    public ph: ProfileService,
    public router: Router,
    private modalService: NgbModal
  ) {
    console.log("Trips COMPOENT");
  }

  ngOnInit() {
    this.completedRides();
    // this.ph
    //   ._getDriverProfile()
    //   .valueChanges()
    //   .subscribe((res) => {
    //     console.log(res);

    //     this.items = [];
    //     res.forEach((snap) => {
    //       console.log("SNAAAPP:::", snap);
    //       let userInfo = snap.userInfo;
    //       this.items.push({
    //         state: userInfo.active_state,
    //         name: userInfo.name,
    //         phone: userInfo.phoneNumber,
    //         pic: userInfo.license_picture,
    //       });
    //       this.items;
    //       console.log("ITEM LISTSS::: ", this.items);
    //       return false;
    //     });
    //   });
  }

  completedRides() {
    console.log("INIT----");
    this.ph
      .getEventList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
        this.items = [];

        res.forEach((snap) => {
          console.log("ALL EVENT LISTSS:::", snap);

          this.eventList = [];

          this.items.push({
            id: snap.key,
            driver_name: snap.name,
            price: snap.realPrice,
            date: snap.date,
            location: snap.location,
            destination: snap.destination,
            rider_name: snap.user_name,
          });

          // this.eventList.sort();
          // this.eventList.reverse();
          // this.dataSource = this.items.reverse();
          // console.log("DATA SOURCE:::", this.dataSource);

          console.log(this.items);

          return false;
        });
      });
  }

  open(content) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  approveDriver(item) {
    console.log("DRIVER ID", item);
    let state = this.ph.updateState(item);
  }

  blockDriver(item) {
    console.log("DRIVER ID", item);
    let state = this.ph.disableDriver(item);
  }
}
