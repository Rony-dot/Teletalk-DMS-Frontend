import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesComponent} from "./components/employees/employees.component";
import {EmployeeDetailsComponent} from "./components/employee-details/employee-details.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {UserService} from "./services/user.service";
import {DemoComponent} from "./components/demo/demo.component";
import {CustomerComponent} from "./components/customer/customer.component";

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'demo', component: DemoComponent, canActivate : [UserService]},
  {path:'employees', component: EmployeesComponent, canActivate: [UserService]},
  {path:'employees/:id', component: EmployeeDetailsComponent, canActivate: [UserService]},
  {path:'customers', component: CustomerComponent, canActivate: [UserService]},
  {path : '' , redirectTo : '/home', pathMatch : 'full'},
  {path : '**' , redirectTo : '/home', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
