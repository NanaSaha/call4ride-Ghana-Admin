import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app'
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public _firebaseAuth: AngularFireAuth, public router: Router, public ngZone: NgZone) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        }
        else {
          this.userDetails = null;
        }
      }
    );

  }

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this._firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("SIGNUP RESULT:::" + JSON.stringify(result));
      
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
    // return this._firebaseAuth.signInWithEmailAndPassword(email, password)

    return this._firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("SIGIN RESULT:::" + JSON.stringify(result));
   
        this.ngZone.run(() => {

      
          this.router.navigate(["/dashboard/dashboard1"]);
        });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
        console.log("ERROR SIGNING IN" + error.message);
      });

    //uncomment above firebase auth code and remove this temp code
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(true);
      }, 1000);
    });

  }

  logout() {
    this._firebaseAuth.signOut();
    this.router.navigate(['YOUR_LOGOUT_URL']);
  }

  isAuthenticated() {
    return true;
  }
}
