import { Component, OnInit } from '@angular/core';
import {Customer} from "../../models/customer";
import {UserService} from "../../services/user.service";
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "../../models/employee";
import {AccessControl} from "../../models/access-control";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer : Customer = new Customer();
  accessControl : AccessControl = new AccessControl();
  userId : number | undefined = 0;
  constructor( private userService : UserService, private customerService : CustomerService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.getCustomerDetails(this.route.snapshot.params.id);
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

  getCustomerDetails(id: string): Customer {
    this.customerService.getById(id)
      .subscribe(
        data  => {
          this.customer = data.body? data.body : new Customer();
        },
        error => {
          console.log(error);
        });
    return this.customer;
  }

}
