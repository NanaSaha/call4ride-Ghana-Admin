import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ProfileService } from "../shared/services/profile.service";
import { Router } from "@angular/router";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-drivers",
  templateUrl: "./drivers.component.html",
  styleUrls: ["./drivers.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DriversComponent implements OnInit {
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
  role;
  constructor(
    public ph: ProfileService,
    public router: Router,
    private modalService: NgbModal
  ) {
    console.log("Drivers COMPOENT");
    this.startUp()
  }

  ngOnInit() {
    this.startUp()
    this.ph._getDriverProfile().on("value", (snapshot) => {
      console.log(snapshot);

        this.items = [];
      snapshot.forEach((snap) => {
          console.log("SNAAAPP:::", snap);
          console.log("SNAAAPP:::", snap.key);
        // let userInfo = snap.userInfo;
        let userInfo = snap.val().userInfo;
          this.items.push({
            key: snap.key,
            state: userInfo.active_state,
            name: userInfo.first_name + userInfo.last_name,
            phone: userInfo.phonenumber,
            pic: userInfo.picture,
            isOffline: userInfo.isOffline,
            unique_number: userInfo.unique_number,
            has_subscribed: userInfo.has_subscribed



          });
          this.items;
          console.log("ITEM LISTSS::: ", this.items);
          return false;
        });
      });

  
  }


  details(item) {
    console.log("DRIVER ID", item);
    this.router.navigate(['driver-details', { driver_id: item }]); 

    // this.ph
    //   ._getDriverProfile()
    //   .child(item)
    //   .on("value", (userProfileSnapshot) => {
    //     console.log(userProfileSnapshot.val());

    //     userProfileSnapshot.forEach((snap) => {
    //       console.log("SNAP", snap);
    //       console.log("SNAP", snap.val().license);

    //       this.eventList.push({
    //         license: snap.val().license,
    //         license_picture: snap.val().license_picture,
    //         car_picture: snap.val().img,
    //         plate: snap.val().plate,
    //         carName: snap.val().carName,
    //         carmodel: snap.val().carmodel,
    //         caryear: snap.val().caryear,
    //         insurance_picture: snap.val().insurance_picture,
    //         driver_picture: snap.val().picture,
    //       });
    //     });
    //   });
  }

  // open(content) {
  //   this.modalService.open(content).result.then(
  //     (result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     },
  //     (reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     }
  //   );
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return "by pressing ESC";
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return "by clicking on a backdrop";
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  approveDriver(item) {
    console.log("DRIVER ID", item);
    let state = this.ph.updateState(item);
  }

  blockDriver(item) {
    console.log("DRIVER ID", item);
    let state = this.ph.disableDriver(item);
  }



  startUp() {
    console.log("profileServ PROFILE SERVICE", this.ph);
   
        this.ph
          .getAllUsers()
          .child(this.ph.id)
          .on("value", (userProfileSnapshot) => {
            console.log("USER PROFILE SNAPSHOT::", userProfileSnapshot.val());

            console.log("PROFILE ID::", this.ph.id);
            this.role = userProfileSnapshot.val().role;
            console.log("ROLE" + this.role);
            // this.router.navigate(["/dashboard/dashboard1"]);

          });
      }
  
  
}
