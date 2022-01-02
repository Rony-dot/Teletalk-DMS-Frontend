import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {environment} from "../../environments/environment";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }


  fetchAllCustomers(): Observable<HttpResponse<Customer[]>> {
    // @ts-ignore
    return this.httpClient.get<Employee[]>(environment.BASE_URL + '/customers',{observe : 'response'});
  }
}
