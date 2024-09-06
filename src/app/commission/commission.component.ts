


import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from "../shared/services/profile.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import firebase from "firebase";

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {
  public campaignForm: any;
  editing: boolean = false;
  percentage;
  earn;
  key;
  commissions;

  constructor(public ph: ProfileService,
    public router: Router,
    public _form: FormBuilder, private _detector: ChangeDetectorRef, public route: ActivatedRoute,) {

    this.campaignForm = this._form.group(
      {

        percentage: ["", [Validators.required]],
        earn: ["", [Validators.required]],
       



      },

    );
  }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get("key")
    this._detector.detectChanges();
    console.log("key --->>", this.key);
    if (this.key != null || this.key != undefined) {
      this._detector.detectChanges();
      this.retrievecommissions(this.key)
      this.editing = true

    }
    else {

    }
  }

  sub() {

    if (this.campaignForm.invalid) {
      alert("All entries are required")
      return;
    }

    let signupVal = JSON.stringify(this.campaignForm.value);

    let jsonBody = JSON.parse(signupVal);

    console.log("THIS IS THE SIGNUP raw values VALUES" + signupVal);
    console.log("percentage" + jsonBody.percentage);
   

    this.ph
      .createComm(
        jsonBody.percentage,
        jsonBody.earn,

      )

    this.router.navigate(['pricing']);
  }


  retrievecommissions(key) {
    console.log("RETRIEVING commissions")

    this.commissions = firebase.database().ref(`commissions/${key}`);

    this.commissions.orderByChild("date").on("value", (pricings) => {

      console.log("pricingsSnap::", pricings.val());
      this.earn = pricings.val().earn;
      this.percentage = pricings.val().percentage;
      
      console.log("earn number::", this.earn);
      console.log("percentage number::", this.percentage);
    
      this._detector.detectChanges();


    });
  }

  update(key) {
    let signupVal = JSON.stringify(this.campaignForm.value);

    let jsonBody = JSON.parse(signupVal);

    console.log("Key" + key);
    console.log("THIS IS THE SIGNUP raw values VALUES" + signupVal);
    console.log("earn" + jsonBody.earn);
    console.log("percentage NAME" + jsonBody.percentage);
   

    this.ph
      .updateCommision(
        key,
        jsonBody.percentage,
        jsonBody.earn
        

      )

    this.router.navigate(['pricing']);
  }

}

