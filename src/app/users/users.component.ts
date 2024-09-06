import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ProfileService } from "../shared/services/profile.service";
import { Router } from "@angular/router";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import firebase from "firebase";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit {
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
    this.ph.getAllUsers().on("value", (snapshot) => {
      console.log(snapshot);

      this.items = [];
      snapshot.forEach((snap) => {
        console.log("SNAAAPP:::", snap);
        console.log("SNAAAPP:::", snap.key);
        // let userInfo = snap.userInfo;
        let userInfo = snap.val();
        this.items.push({
          key: snap.key,
          name: userInfo.name,
          role: userInfo.role,
          email: userInfo.email


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
  }


  delete(key) {

    firebase.database().ref("adminUsers").child(key).remove();


  }

  open() {
    this.router.navigate(['new-user']);

  }

 

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
