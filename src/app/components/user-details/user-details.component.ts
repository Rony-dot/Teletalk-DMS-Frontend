import { Component, OnInit } from '@angular/core';
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../models/user-model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


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
        },
        error => {
          console.log(error);
        });
    return this.user;
  }

}
