import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import { AuthService } from "../../../shared/auth/auth.service";
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app'
import { ProfileService } from "../../../shared/services/profile.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  registerFormSubmitted = false;
  loading = false;
  registerForm: FormGroup;
  private user: Observable<firebase.User>;
  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService, public _firebaseAuth: AngularFireAuth, public ph: ProfileService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
              
               this.router.navigate(['/pages/login']);
            }
            else {
              console.log("No USer is ", user)
            }
          }
        );
        // data => {
     
          console.log("NAME IS", this.rf.name.value)
          console.log("ROLE IS", this.rf.role.value)

             // this.userService
                
          //       .addUser(
          //         this.rf.name.value,
          //         this.rf.role.value,
          //         data.id,
                  
          //       )
         
          // this.router.navigate(["/CreateWill"]);
        },
        error => {
          console.log("ERROR", error)
          this.loading = false;
        });
    
    console.log("authObs IS", authObs)
    
    

    // this.router.navigate(['/pages/login']);
  }
}
