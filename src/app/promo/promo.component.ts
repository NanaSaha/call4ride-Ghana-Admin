import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProfileService } from "../shared/services/profile.service";

import firebase from "firebase";
@Component({
  selector: "app-promo",
  templateUrl: "./promo.component.html",
  styleUrls: ["./promo.component.scss"],
})
export class PromoComponent implements OnInit {
  items;
  campaigns;
  snap;
  campaign_item
  constructor(public ph: ProfileService,
    public router: Router) {
    
    this.campaigns = firebase.database().ref(`campaigns`);
    this.retrieveCampaigns()
    }

  ngOnInit(): void {}


  open() {
    this.router.navigate(['campaign']);

  }

  retrieveCampaigns() {
    console.log("RETRIEVING campaigns")

    this.campaigns.orderByChild("date").on("value", (predictSnap) => {
      console.log("predictSnap::", predictSnap.val());
      this.snap = Array.of(predictSnap.val())
      let snap = predictSnap;
      let item = []
      snap.forEach((snapLoop) => {
        let description = snapLoop.val().description;
        let amount = snapLoop.val().amount;
        let hours = snapLoop.val().hours;
        let no_trips = snapLoop.val().no_trips;
        let date = snapLoop.val().date;
        let key = snapLoop.key;


        console.log("description number::", description);
        console.log("amount number::", amount);
        item.push({
          description,
          amount,
          hours,
          no_trips,
          date,
          key

        });
        this.campaign_item = item
        console.log("campaign_item number::", item);
      })


    });
  }


  delete(key) {

    // console.log("PRICE KEY", key);
    // this.pricings = firebase.database().ref(`pricing`);
    // firebase.database().ref('/pricing/' + key).remove();
    firebase.database().ref("campaigns").child(key).remove();

    // .delete ()

  }
}
