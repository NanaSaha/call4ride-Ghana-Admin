import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from "../shared/services/profile.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../shared/directives/must-match.validator';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app'
import { AuthService } from "../shared/auth/auth.service";



@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  public campaignForm: any;
  loading = false;
  pricings;
  registerFormSubmitted = false;
  base
  pricePerKm
  surge;
  key;
  editing: boolean = false;
  private user: Observable<firebase.User>;

  registerForm: FormGroup;
  constructor(public ph: ProfileService,
    public router: Router,
    public _form: FormBuilder,
    public route: ActivatedRoute,
    private _detector: ChangeDetectorRef, public _firebaseAuth: AngularFireAuth, public authService: AuthService,) {



    this.registerForm = this._form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
   
  }




  ngOnInit(): void {
   


    this.key = this.route.snapshot.paramMap.get("key")
    this._detector.detectChanges();
    console.log("key --->>", this.key);
    if (this.key != null || this.key != undefined) {
      this._detector.detectChanges();
      // this.retrievePricings(this.key)
      this.editing = true

    }
    else {

    }
  }

  get rf() {
    return this.registerForm.controls;
  }
  //  On submit click, reset field value
  onSubmit() {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.user = this._firebaseAuth.authState;


    let authObs = this.authService.SignUp(this.rf.email.value, this.rf.password.value)

      .then((result) => {
        this.user.subscribe(
          (user) => {
            if (user) {
              console.log("USer is ", user.uid)
              this.ph
                .createUsers(
                  this.rf.name.value,
                  this.rf.role.value,
                  this.rf.email.value,
                  user.uid,

                )

              this.router.navigate(['users']);
            }
            else {
              console.log("No USer is ", user)
            }
          }
        );
        // data => {

        console.log("NAME IS", this.rf.name.value)
        console.log("ROLE IS", this.rf.role.value)

      },
        error => {
          console.log("ERROR", error)
          this.loading = false;
        });

    console.log("authObs IS", authObs)


  }


}


