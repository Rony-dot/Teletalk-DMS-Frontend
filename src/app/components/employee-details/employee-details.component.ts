import { Component, OnInit } from '@angular/core';
import {Employee} from "../../models/employee";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {AccessControl} from "../../models/access-control";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user-model";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee = new Employee();
  accessControl : AccessControl = new AccessControl();
  userId : number | undefined = 0;
  constructor( private userService : UserService, private employeeService : EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getEmployeeDetails(this.route.snapshot.params.id);
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
  }

  getEmployeeDetails(id: string): Employee {
    this.employeeService.getById(id)
      .subscribe(
        emp  => {
          this.employee = emp.body? emp.body : new Employee();
          },
        error => {
          console.log(error);
        });
    return this.employee;
  }



}
