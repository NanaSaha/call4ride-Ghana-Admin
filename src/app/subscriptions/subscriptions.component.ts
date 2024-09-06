import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../shared/services/profile.service";

@Component({
  selector: "app-subscriptions",
  templateUrl: "./subscriptions.component.html",
  styleUrls: ["./subscriptions.component.scss"],
})
export class SubscriptionsComponent implements OnInit {
  public items: any;
  role: any;
  constructor(public ph: ProfileService) {

    this.startUp()
  }

  ngOnInit(): void {
    this.startUp()

    // this.ph
    //   .getAllsubscriptions()
    //   .valueChanges()
    //   .subscribe((res) => {
    //     console.log(res);

    //     this.items = [];
    //     res.forEach((snap) => {
    //       console.log("SNAAAPP:::", snap);
    //       let userInfo = snap;
    //       this.items.push({
    //         funds: userInfo.funds,
    //         trans: userInfo.reference,
    //         status: userInfo.status,
    //         user_id: userInfo.user_id,
    //         first_name: userInfo.first_name,
    //         last_name: userInfo.last_name,
    //         phone: userInfo.phone,
    //         email: userInfo.email,
    //         has_subscribed: userInfo.has_subscribed,
    //         date: userInfo.date,
    //         key: userInfo.key
    //       });
    //       this.items;
    //       console.log("ITEM LISTSS::: ", this.items);
    //       return false;
    //     });
      
    //   });
    
    this.ph
      .getAllsubscriptions2()
      .on("value", (userProfileSnapshot) => {
        console.log("Subscription PROFILE SNAPSHOT::", userProfileSnapshot.val());

        this.items = [];

        userProfileSnapshot.forEach((snap) => {
          console.log("SNAAAPP:::", snap);
          console.log("SNAAAPP:::", snap.key);
          
          let userInfo = snap.val();
          this.items.push({
            funds: userInfo.funds,
            trans: userInfo.reference,
            status: userInfo.status,
            user_id: userInfo.user_id,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            phone: userInfo.phone,
            email: userInfo.email,
            has_subscribed: userInfo.has_subscribed,
            date: userInfo.date,
            key: snap.key



          });
          this.items;
          console.log("ITEM LISTSS WITH ID::: ", this.items);
          return false;
        });

       

      });
    
    
      
  }

  subDriver(id,key) {
    console.log("User ID::", id, key)
    this.ph.updateUserSubscription(id, true)
    this.ph.updateMainSubscription(key, "true")
    
  }

  unsubDriver(id,key) {
    console.log("User ID::", id, key)

    this.ph.updateUserSubscription(id, false)
    this.ph.updateMainSubscription(key, "false")
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
