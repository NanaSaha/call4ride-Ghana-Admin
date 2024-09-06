import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../shared/services/profile.service";

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {
  public eventList: Array<any>;
  constructor(public ph: ProfileService,
    public router: ActivatedRoute) { 
    
  
   let driver_id = this.router.snapshot.paramMap.get("driver_id")
    console.log("Driver ID", driver_id)
    this.eventList = [];
    this.ph
      ._getDriverProfile()
      .child(driver_id)
      .on("value", (userProfileSnapshot) => {
        console.log(userProfileSnapshot.val());

        userProfileSnapshot.forEach((snap) => {
          console.log("SNAP", snap);
          console.log("SNAP", snap.val().license);

          this.eventList.push({
            license: snap.val().license,
            license_picture: snap.val().license_picture,
            car_picture: snap.val().img,
            plate: snap.val().plate,
            carName: snap.val().carName,
            carmodel: snap.val().carmodel,
            caryear: snap.val().caryear,
            insurance_picture: snap.val().insurance_picture,
            driver_picture: snap.val().picture,
          });
        });
      });
  }

  ngOnInit(): void {
  }

}
