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
  selector: "app-riders",
  templateUrl: "./riders.component.html",
  styleUrls: ["./riders.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RidersComponent implements OnInit {
  submitted: boolean = false;
  form: any;
  driverEmail: any;
  username: any;
  isDecided: boolean = false;
  id: any;
  message: any;
  role: any;
  isDecider2: boolean = false;
  public items: any;
  closeResult: string;
  constructor(
    public ph: ProfileService,
    public router: Router,
    private modalService: NgbModal
  ) {
    this.startUp();
  }

  ngOnInit() {
  
  

//     this.ph
//       ._getUserProfile()
//       .valueChanges()
//       .subscribe((res) => {
//         console.log(res);

//         this.items = [];
//         res.forEach((snap) => {
//           console.log("SNAAAPP:::", snap);
//           let userInfo = snap.userInfo;
//           this.items.push({
//             name: userInfo.first_name + userInfo.last_name,
//             phone: userInfo.phonenumber,
//             unique_number
//               : userInfo.unique_number
// ,
//           });
//           this.items;
//           console.log("ITEM LISTSS::: ", this.items);
//           return false;
//         });
//       });
    
   
    
    
    
    
    this.ph._getriderProfile().on("value", (snapshot) => {
      console.log(snapshot);

      this.items = [];
      snapshot.forEach((snap) => {
      
        console.log("SNAAAPP:::", snap.key);
        // let userInfo = snap.userInfo;
        let userInfo = snap.val().userInfo;
        this.items.push({
          key: snap.key,
       
          name: userInfo.first_name + userInfo.last_name,
          phone: userInfo.phonenumber,
          unique_number
            : userInfo.unique_number
         



        });
        this.items;
        console.log("ITEM LISTSS 2::: ", this.items);
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

  goto_Item(item) {
    // this.ctrl.cur_Item = item;
    this.router.navigateByUrl("client_details").then((sucess) => {});
  }

  gotoPage(item) {
    window.open(item);
  }

  deleteComm(key) {
    firebase.database().ref("userProfile").child(key).remove();
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
