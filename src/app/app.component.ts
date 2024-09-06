import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import {
    AngularFireDatabase,
    AngularFireList,
    AngularFireObject,
} from "@angular/fire/database";

//import { map, first } from "rxjs/operators";
import { map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import firebase from "firebase/app";
import { ProfileService } from "./shared/services/profile.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(private router: Router, public ph: ProfileService) {
        this.startUp()
    }

    ngOnInit() {
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


    startUp() {
        console.log("profileServ PROFILE SERVICE", this.ph);
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                // if this is not a user then show entrance scene and hide status bar

                console.log("USER EXISTS:::", user);
                console.log("USER DOESNT NOT EXISTS");

                unsubscribe();
            } else {
                console.log("USER EXISTS:::", user);
                unsubscribe();
                // Check If the connection is okay or bad.
                this.ph
                    .getAllUsers()
                    .child(this.ph.id)
                    .on("value", (userProfileSnapshot) => {
                        console.log("USER PROFILE SNAPSHOT::", userProfileSnapshot.val());

                        console.log("PROFILE ID::", this.ph.id);
                        let name = userProfileSnapshot.val().name;
                        let role = userProfileSnapshot.val().role;


                        console.log(" NAME" + name);
                        console.log("ROLE" + role);
                        // this.router.navigate(["/dashboard/dashboard1"]);

                    });
            }
        });
    }



}