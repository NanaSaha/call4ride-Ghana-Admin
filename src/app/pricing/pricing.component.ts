import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProfileService } from "../shared/services/profile.service";
import firebase from "firebase";

@Component({
  selector: "app-pricing",
  templateUrl: "./pricing.component.html",
  styleUrls: ["./pricing.component.scss"],
})
export class PricingComponent implements OnInit {
  items;
  items2;
  pricings;
  snap;
  campaign_item;
  commissions;
  role;
  constructor(public ph: ProfileService,
    public router: Router) {

    this.pricings = firebase.database().ref(`pricing`);
    this.commissions = firebase.database().ref(`commissions`); 
    this.retrievePricings()
    this.retrievecommissions()
    this.startUp();
  }

  ngOnInit(): void {
    this.startUp();
   }
  open() {
    this.router.navigate(['pricingnew']);

  }

  openComm() {
    this.router.navigate(['commission']);
  }

  retrievePricings() {
    console.log("RETRIEVING retrievePricings")

    this.pricings.orderByChild("date").on("value", (predictSnap) => {
      console.log("predictSnap::", predictSnap.val());
      this.snap = Array.of(predictSnap.val())
      let snap = predictSnap;
       this.items= []
      snap.forEach((snapLoop) => {
        let base = snapLoop.val().base;
        let pricePerKm = snapLoop.val().pricePerKm;
        let surge = snapLoop.val().surge;
        let date = snapLoop.val().date;
        let key = snapLoop.key;




        console.log("description number::", base);
        console.log("amount number::", pricePerKm);
        console.log("KEY::", key);
        this.items.push({
          base,
          pricePerKm,
          surge,
          date,
          key

        });
        this.campaign_item = this.items
        this.items.sort();
        this.items.reverse();
        console.log("campaign_item number::", this.items);
      })


    });
  }

  delete(key) {

    // console.log("PRICE KEY", key);
    // this.pricings = firebase.database().ref(`pricing`);
    // firebase.database().ref('/pricing/' + key).remove();
    firebase.database().ref("pricing").child(key).remove();

    // .delete ()
    
  }

  deleteComm(key) {
    firebase.database().ref("commissions").child(key).remove();
  }

  edit(key) {

    this.router.navigate(['pricingnew', { key: key }]);

  }

  editcom(key) {

    this.router.navigate(['commission', { key: key }]);

  }



  retrievecommissions() {
    console.log("RETRIEVING commissions")

    this.commissions.orderByChild("date").on("value", (predictSnap) => {
      console.log("predictSnap::", predictSnap.val());
      this.snap = Array.of(predictSnap.val())
      let snap = predictSnap;
      this.items2 = []
      snap.forEach((snapLoop) => {
        let percentage = snapLoop.val().percentage;
     
        let earn = snapLoop.val().earn;
        let key = snapLoop.key;


        console.log("percentage number::", percentage);
      
        this.items2.push({
          percentage,
          earn,
          key

        });
        this.campaign_item = this.items2
        this.items2.sort();
        this.items2.reverse();
        console.log("campaign_item number::", this.items2);
      })


    });
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
