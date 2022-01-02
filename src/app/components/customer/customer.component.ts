import { Component, OnInit } from '@angular/core';
import {Customer} from "../../models/customer";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  searchText : string = '';
  // @ts-ignore
  customers : Customer[] ;

  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
    this.customerService.fetchAllCustomers().subscribe(
      data => {
        console.log(data)
        this.customers = data.body ? data.body : []
      },
      error => {
        console.log(error)
      }
    )
  }

}
