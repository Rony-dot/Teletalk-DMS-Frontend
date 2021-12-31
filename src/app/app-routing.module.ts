import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesComponent} from "./components/employees/employees.component";
import {EmployeeDetailsComponent} from "./components/employee-details/employee-details.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'employees', component: EmployeesComponent},
  {path:'employees/:id', component: EmployeeDetailsComponent},
  {path : '' , redirectTo : '/home', pathMatch : 'full'},
  {path : '**' , redirectTo : '/home', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
