import { Component, ViewChild } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm: FormGroup;

  // loginForm = new FormGroup({
  //   username: new FormControl("admin@call4ride.com", [Validators.required]),
  //   password: new FormControl("Password", [Validators.required]),
  //   rememberMe: new FormControl(true),
  // });

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
  ) {
    this.loginForm = this.formBuilder.group({
     
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [''],
    });
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });

    this.authService
      .signinUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((res) => {
        this.spinner.hide();
        // this.router.navigate(["/dashboard/dashboard1"]);
      })
      .catch((err) => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log("error: " + err);
      });
  }
}
