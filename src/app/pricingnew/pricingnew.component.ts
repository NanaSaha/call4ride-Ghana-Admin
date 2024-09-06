import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from "../shared/services/profile.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import firebase from "firebase";


@Component({
  selector: 'app-pricingnew',
  templateUrl: './pricingnew.component.html',
  styleUrls: ['./pricingnew.component.scss']
})
export class PricingnewComponent implements OnInit {
  public campaignForm: any;
  pricings;

  base
  pricePerKm
  surge;
  key;
  editing: boolean = false;

  
  constructor(public ph: ProfileService,
    public router: Router,
    public _form: FormBuilder,
    public route: ActivatedRoute,
    private _detector: ChangeDetectorRef) {

    
    

    this.campaignForm = this._form.group(
      {

        base: ["",Validators.compose([Validators.required])],
        pricePerKm: ["", Validators.compose([Validators.required])],
        surge: [""],
    


      },

    );
 
  }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get("key")
    this._detector.detectChanges();
    console.log("key --->>", this.key);
    if (this.key != null || this.key != undefined) {
      this._detector.detectChanges();
      this.retrievePricings(this.key) 
      this.editing = true
      
    }
    else {
      
    }
  }

  sub() {
    let signupVal = JSON.stringify(this.campaignForm.value);

    let jsonBody = JSON.parse(signupVal);

    console.log("THIS IS THE SIGNUP raw values VALUES" + signupVal);
    console.log("base" + jsonBody.base);
    console.log("distance NAME" + jsonBody.pricePerKm);
    console.log("surge" + jsonBody.surge);

    this.ph
      .createPricing(
        jsonBody.base,
        jsonBody.pricePerKm,
        jsonBody.surge || ""

      )

    this.router.navigate(['pricing']);
  }

  update(key) {
    let signupVal = JSON.stringify(this.campaignForm.value);

    let jsonBody = JSON.parse(signupVal);

    console.log("Key" + key);
    console.log("THIS IS THE SIGNUP raw values VALUES" + signupVal);
    console.log("base" + jsonBody.base);
    console.log("distance NAME" + jsonBody.pricePerKm);
    console.log("surge NAME" + jsonBody.surge);

    this.ph
      .updatePricing(
        key,
        jsonBody.base,
        jsonBody.pricePerKm,
        jsonBody.surge

      )

     this.router.navigate(['pricing']);
  }





  retrievePricings(key) {
    console.log("RETRIEVING retrievePricings")

    this.pricings = firebase.database().ref(`pricing/${key}`);

    this.pricings.orderByChild("date").on("value", (pricings) => {

      console.log("pricingsSnap::", pricings.val());
      this.base = pricings.val().base;
      this.pricePerKm = pricings.val().pricePerKm;
      this.surge = pricings.val().surge;
      console.log("base number::", this.base);
      console.log("price number::", this.pricePerKm);
      console.log("Suegr number::", this.surge);
      this._detector.detectChanges();
    

    });
   
  }

}

