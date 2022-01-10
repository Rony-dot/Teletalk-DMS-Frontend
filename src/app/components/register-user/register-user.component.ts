import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../models/user-model";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  private userDataModel = new UserModel();
  isAdmin : boolean = false;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem("isAdmin")?.includes("admin")){
      this.isAdmin = true;
    }
  }

  registerForm = new FormGroup({
    name : new FormControl("", Validators.required),
    email : new FormControl("", Validators.required),
    username : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required),
    mobile : new FormControl("", Validators.required),
    age : new FormControl("", Validators.required),
    countryCode : new FormControl("", Validators.required),
    gender : new FormControl("", Validators.required),
    salutation : new FormControl("", Validators.required),
    dateOfBirth : new FormControl("", Validators.required),
  });


  registerUser(UserInformation : any) {
    this.userDataModel.name = (this.name?.value);
    this.userDataModel.email = (this.email?.value);
    this.userDataModel.username = (this.username?.value);
    this.userDataModel.password = (this.password?.value);
    this.userDataModel.mobile = (this.mobile?.value);
    this.userDataModel.age = (this.age?.value);
    this.userDataModel.dateOfBirth = (this.dateOfBirth?.value);
    this.userDataModel.countryCode = (this.countryCode?.value);
    this.userDataModel.gender = (this.gender?.value);
    this.userDataModel.salutation = (this.salutation?.value);
    this.userService.registerUser(this.userDataModel).subscribe(data=>{
      console.log(data)
    }, error => {
      console.log(error)
    });
  }

  get name(){
    return this.registerForm.get('name');
  }

  get username(){
    return this.registerForm.get('username');
  }

  get age(){
    return this.registerForm.get('age');
  }

  get dateOfBirth(){
    return this.registerForm.get('dateOfBirth');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get mobile(){
    return this.registerForm.get('mobile');
  }

  get countryCode(){
    return this.registerForm.get('countryCode');
  }

  get gender(){
    return this.registerForm.get('gender');
  }

  get salutation(){
    return this.registerForm.get('salutation');
  }


}
