import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    HeaderComponent,
    HomeComponent,
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
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
