import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";

//import { map, first } from "rxjs/operators";
import { map, filter, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import firebase from "firebase/app";

@Injectable()
export class ProfileService {
  public driverProfile: any;
  public riderProfile: any;
  public all_subscriptions: any;
  public userProfile: any;
  public subscriptions: any;
  public activityProfile: any;
  public dashboardProfile: any;
  public ActiveDriverProfile: any;
  public ItemProfile: any;
  public userFeed: any;
  public driverFeed: any;
  public completedTrips: any;
  campaigns;
  // adminUsers;
  pricings;
  commissions;
  public user: any;
  public id: any;
  public adminUsers: firebase.database.Reference;
  
  // public userProfileRef: firebase.database.Reference;

  public subitemProfile: any;
  constructor(public af: AngularFireDatabase) {

    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        // console.log(user)
        this.user = user;
        //console.log(this.user)
        this.id = this.user.uid;
        this.driverProfile = firebase.database().ref(`driverProfile`);
        this.riderProfile = firebase.database().ref(`userProfile`);
        this.all_subscriptions = firebase.database().ref(`subscriptions`);
        this.dashboardProfile = this.af.list(`DashboardSettings`);
        // this.driverProfile = this.af.list(`driverProfile`);
        this.userFeed = this.af.list(`DashboardSettings/user/complains`);
        this.driverFeed = this.af.list(`DashboardSettings/driver/complains`);
        this.userProfile = this.af.list(`userProfile`);
        this.subscriptions = this.af.list(`subscriptions`); 
        this.activityProfile = this.af.list(`Customer`);
        this.ActiveDriverProfile = this.af.list(`Drivers/AllDrivers`);
        this.ItemProfile = this.af.list(`ItemProfile`);
        this.completedTrips = this.af.list(`Completed`);

        this.subitemProfile = this.af.list(`ItemProfile/Stuffs`);

        this.campaigns = this.af.list(`campaigns`);
        this.pricings = this.af.list(`pricing`);
        this.commissions = this.af.list(`commissions`);
        this.adminUsers = firebase.database().ref("/adminUsers");
       // this.subscriptions = firebase.database().ref("subscriptions"); 
       
    
      }
      
    });
  }

  getActivityProfile() {
    return this.activityProfile;
  }

  getItemProfile(id: any) {
    return this.ItemProfile.child(id);
  }

  getDriverProfile(id: any) {
    return this.driverProfile.child(id);
  }

  _getDriverProfile() {
    return this.driverProfile;
  }



  getAllUsers() {
    return this.adminUsers;
  }

  getAllsubscriptions() {
    return this.subscriptions;
  }

  getAllsubscriptions2() {
    return this.all_subscriptions;
  }

  

  createUsers(
    name,
    role,
    email,
    id,
  ) {

    var todayDate = "";
    var d = new Date();
    todayDate += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    todayDate;
    this.adminUsers.child(id).set({
      name: name,
      role: role,
      email: email,
      id: this.id,
      date: todayDate,
    });
  }



  createCampaign(
    description,
    amount,
    hours,
    no_trips,

  ): Promise<any> {

    var todayDate = "";
    var d = new Date();
    todayDate += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    todayDate;
    return this.campaigns.push({

      description,
      amount,
      hours,
      no_trips,
      date: todayDate

    });
  }



  createPricing(
    base,
    pricePerKm,
    surge,
    ): Promise<any> {

    var todayDate = "";
    var d = new Date();
    todayDate += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    todayDate;
    return this.pricings.push({

      base,
      pricePerKm,
      surge,
      date: todayDate

    });
  }

  updatePricing(
    key,
    base,
    pricePerKm,
    surge,
  ): Promise<any> {

    var todayDate = "";
    var d = new Date();
    todayDate += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    todayDate;
    this.pricings = firebase.database().ref(`pricing/${key}`);
    return this.pricings.update({

      base,
      pricePerKm,
      surge,
      date: todayDate

    });
  }


  updateCommision(
    key,
    percentage,
    earn,
  ): Promise<any> {

    var todayDate = "";
    var d = new Date();
    todayDate += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    todayDate;
    this.pricings = firebase.database().ref(`commissions/${key}`);
    return this.pricings.update({

      percentage,
      earn,
      date: todayDate

    });
  }


  createComm(percentage,earn


  ): Promise<any> {

    var todayDate = "";
    var d = new Date();
    todayDate += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    todayDate;
    return this.commissions.push({

      percentage,
      earn,
      date: todayDate

    });
  }

  _getFeedUserProfile() {
    return this.userFeed;
  }

  getUserProfile(id: any) {
    return this.userProfile.child(id);
  }

  _getUserProfile() {
    return this.userProfile;
  }

  _getriderProfile() {
    return this.riderProfile;
  }
  

  getFeedUserProfile(id: any) {
    return this.userFeed.child(id);
  }

  getFeedDriverProfile(id: any) {
    return this.driverFeed.child(id);
  }

  _getFeedDriverProfile() {
    return this.driverFeed;
  }

  ChangeItem(id: any, idi: any) {
    return this.af.list(`ItemProfile/${id}/Stuffs/${idi}`);
  }

  ChangeMainItem(id: any) {
    return this.af.list(`ItemProfile/${id}/`);
  }

  getInnerItem(id: any) {
    return this.af.list(`ItemProfile/${id}/Stuffs`);
  }

  getSecondaryItem(id: any, subid: any) {
    return this.af.list(`ItemProfile/${id}/Stuffs/${subid}`);
  }

  getDashboardProfile() {
    return this.dashboardProfile;
  }

  getActiveDriverProfile() {
    return this.ActiveDriverProfile;
  }

  updateState(id) {
    console.log("DRIVER ID::", id);
    return this.driverProfile.child(id).child("userInfo").update({
      active_state: true,
    });
  }



  updateUserSubscription(id,status) {
    console.log("DRIVER ID::", id);
    return this.driverProfile.child(id).child("userInfo").update({
      has_subscribed: status,
    });
  }

  updateMainSubscription(key, status) {
    console.log("Sub ID::", key);
    return this.all_subscriptions.child(key).update({
      has_subscribed: status,
    });
  }

  disableDriver(id) {
    console.log("DRIVER ID::", id);
    return this.driverProfile.child(id).child("userInfo").update({
      active_state: false,
    });
  }

  getEventList() {
    return this.completedTrips;
    //return this.driverProfile.child("userInfo").child("/eventList");
  }
}
