import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import { DemoComponent } from './components/demo/demo.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    DemoComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    UsersComponent,
    UserDetailsComponent,
    RegisterUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    HttpClientModule,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
