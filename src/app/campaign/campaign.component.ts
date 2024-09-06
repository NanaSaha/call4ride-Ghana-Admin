import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../shared/services/profile.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  public campaignForm: any;
  constructor(public ph: ProfileService,
    public router: Router,
    public _form: FormBuilder) {
    
    this.campaignForm = this._form.group(
      {

        description: [""],
        amount: [""],
        hours: [""],
        no_trips: [""]


      },

    );
     }

  ngOnInit(): void {
  }

  sub() {
    let signupVal = JSON.stringify(this.campaignForm.value);

    let jsonBody = JSON.parse(signupVal);

    console.log("THIS IS THE SIGNUP raw values VALUES" + signupVal);
    console.log("descriptionE" + jsonBody.description);
    console.log("amount NAME" + jsonBody.amount);

    this.ph
      .createCampaign(
        jsonBody.description,
        jsonBody.amount,
        jsonBody.hours,
        jsonBody.no_trips

      )

     this.router.navigate(['promo']);
  }

}
