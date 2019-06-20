import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
 
  employee:Employee

  constructor(private _route:ActivatedRoute,private _employeeService:EmployeeService,private _router:Router) { }

  ngOnInit() {
    const id=+this._route.snapshot.params['id'];
    this._employeeService.getEmployee(id).subscribe(
      (employee)=>this.employee=employee,
      (err:any)=>console.log(err)
    );
  }
  
}
