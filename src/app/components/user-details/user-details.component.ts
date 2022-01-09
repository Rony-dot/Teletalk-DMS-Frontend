import { Component, OnInit } from '@angular/core';
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../models/user-model";
import {UserService} from "../../services/user.service";
import {AccessControl} from "../../models/access-control";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  emp_phone ?: boolean = false;
  emp_email ?: boolean = false;
  emp_manager_id ?: boolean = false;
  emp_hire_date ?: boolean = false;
  emp_job_title ?: boolean = false;
  cus_address ?: boolean = false;
  cus_credit_limit ?: boolean = false;
  cus_website ?: boolean = false;
  public isAdmin : boolean = false;
  userId : number | undefined = 0;

  accessControl : AccessControl = new AccessControl();
  user: UserModel = new UserModel();

  constructor( private userService : UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getUserDetails(this.route.snapshot.params.id);
  }

  getUserDetails(id: string): UserModel {
    this.userService.getById(id)
      .subscribe(
        user  => {
          this.user = user.body? user.body : new UserModel();
          if(localStorage.getItem("isAdmin")?.includes("admin")){
            this.isAdmin = true;
          }
          this.userService.currentUser$.subscribe(
            data =>{
              this.userId = data.id;
            }, error => {
              console.log(error)
            }
          )
          this.userService.fetchAllAccessList(this.userId+"").subscribe(
            data =>{
              // @ts-ignore
              this.accessControl = data.body;
              console.log("main access control list :")
              console.log(this.accessControl)
            }, error => {
              console.log(error)
            }
          );
        },
        error => {
          console.log(error);
        });
    return this.user;
  }

}
