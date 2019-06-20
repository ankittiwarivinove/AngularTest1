import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import {CreateEmployeeCanDeactivateGuardService} from './employees/create-employee-can-deactivate-guard.service';
import { from } from 'rxjs';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { PagenotfoundComponent } from './pagenotfound.component';

const appRoutes:Routes = [
  {path:"list",component:ListEmployeesComponent},
  {
    path:"edit/:id",
    component:CreateEmployeeComponent,
    canDeactivate:[CreateEmployeeCanDeactivateGuardService]
  },
  
  { path:"employees/:id",component:EmployeeDetailsComponent},
  {path:"",redirectTo:'/list',pathMatch:"full"}   
  
] 

@NgModule({

  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PagenotfoundComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [EmployeeService,CreateEmployeeCanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
