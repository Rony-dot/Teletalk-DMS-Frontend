import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesComponent} from "./components/employees/employees.component";
import {EmployeeDetailsComponent} from "./components/employee-details/employee-details.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {UserService} from "./services/user.service";
import {DemoComponent} from "./components/demo/demo.component";
import {CustomerComponent} from "./components/customer/customer.component";
import {CustomerDetailsComponent} from "./components/customer-details/customer-details.component";
import {UsersComponent} from "./components/users/users.component";
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {AccessControlViewComponent} from "./components/access-control-view/access-control-view.component";

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'demo', component: DemoComponent, canActivate : [UserService]},
  {path:'employees', component: EmployeesComponent, canActivate: [UserService]},
  {path:'employees/:id', component: EmployeeDetailsComponent, canActivate: [UserService]},
  {path:'customers', component: CustomerComponent, canActivate: [UserService]},
  {path:'customers/:id', component: CustomerDetailsComponent, canActivate: [UserService]},
  {path:'users', component: UsersComponent, canActivate: [UserService]},
  {path:'users/:id', component: UserDetailsComponent, canActivate: [UserService]},
  {path:'profile/:id', component: UserDetailsComponent, canActivate: [UserService]},
  {path:'accessControl/:id', component: AccessControlViewComponent, canActivate: [UserService]},
  {path:'register', component:RegisterUserComponent},
  {path : '' , redirectTo : '/home', pathMatch : 'full'},
  {path : '**' , redirectTo : '/home', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
