import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../models/user-model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({}, [], [])
  submitted = false;
  loading = false;
  userDataModel = new UserModel();
  message : string = ''
  alertType : string = ''
  display : boolean = false

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    if (this.userService.currentUserValue !== null
      && this.userService.currentUserValue !== undefined) {
      window.location.href = '/home'
    }
  }

  get f() {
    return this.loginForm.controls
  }


  login() {
    this.submitted = true;
    if (this.loginForm?.invalid) {
      return;
    }
    this.loading = true;
    // @ts-ignore
    try {
      // @ts-ignore
      this.userService.login(this.f.email.value, this.f.password.value)
        .subscribe(
          data => {
            this.userDataModel = data.body? data.body : new UserModel();
            localStorage.setItem('jwtToken', this.userDataModel.jwtToken ? this.userDataModel.jwtToken : '');
            if(this.userDataModel.roles?.includes("ADMIN")){
              localStorage.setItem('isAdmin', 'admin');
            }
            this.message = "login success"
            this.alertType = 'success'
            this.displayAction()
            window.location.href = '/home'
          },
          error => {
            console.log(error)
            // console.log(error.error.errorItems[0].message)
            this.message = "invalid login information"
            this.alertType = 'danger'
            this.displayAction()
          });
    } catch (e) {
      this.loading = false;
      alert(e)
      console.log("catch error")
      console.log(e)
    }
  }

  displayAction() {
    // @ts-ignore
    setTimeout(() => {
      this.display = false;
    }, 5000);
    this.display = true;
  }


}
