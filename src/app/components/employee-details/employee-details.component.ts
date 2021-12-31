import { Component, OnInit } from '@angular/core';
import {Employee} from "../../models/employee";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee = new Employee();

  constructor( private employeeService : EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getEmployeeDetails(this.route.snapshot.params.id);
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
