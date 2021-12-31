import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  searchText : string = '';
  //@ts-ignore
  employees : Employee[];

  constructor(private employeeService : EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.fetchAllEmployees().subscribe(
      data => {
        console.log(data)
        this.employees = data.body ? data.body : []
      },
      error => {
        console.log(error)
      }
  )
}


}
