import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }


  fetchAllEmployees(): Observable<HttpResponse<Employee[]>> {
    // @ts-ignore
    return this.httpClient.get<Employee[]>(environment.BASE_URL + '/employees',{observe : 'response'});
  }

  getById(id: string): Observable<HttpResponse<Employee>>{
    return this.httpClient.get<Employee>(environment.BASE_URL+'/employees/'+id, {observe:'response'});
  }

  getByName(first_name : string):  Observable<HttpResponse<Employee>>{
    return this.httpClient.get<Employee>(environment.BASE_URL+'/employees/'+first_name, {observe:'response'});
  }
}
