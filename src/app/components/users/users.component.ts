import { Component, OnInit } from '@angular/core';
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user-model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  searchText : string = '';
  //@ts-ignore
  users : UserModel[];

  constructor(private userService : UserService,private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.fetchAllUsers().subscribe(
      data => {
        console.log(data)
        this.users = data.body ? data.body : []
      },
      error => {
        console.log(error)
      }
    )
  }

  usersPdfDownload(){
    this.userService.downloadAllUsersPdf().subscribe(
      data =>{
        this.router.navigate(['/users']);
      }, error =>{
        console.log(error)
      }
    )
  }

  usersExcelDownload(){
    this.userService.downloadAllUsersExcel().subscribe(
      data =>{
        this.router.navigate(['/users']);
      }, error =>{
        console.log(error)
      }
    )
  }

}
