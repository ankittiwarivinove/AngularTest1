import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[]
  employeeToDisplay: Employee;
  private arrayIndex = 1;
  dataFromChild: string;
  searchTerm: string;
  constructor(private _employeeService: EmployeeService, private _Router: Router) { }

  ngOnInit() {
    this._employeeService.getEmployees().subscribe((empList) => {
      this.employees = empList;
    });
    this.employeeToDisplay = this.employees[0];
  }

  nextEmployee(): void {
    if (this.arrayIndex <= 3) {
      this.employeeToDisplay = this.employees[this.arrayIndex];
      this.arrayIndex++;
    } else {
      this.employeeToDisplay = this.employees[0];
      this.arrayIndex = 1;
    }
  }
  handleNotify(eventData: string) {
    this.dataFromChild = eventData;
  }
  onClick(employeeId: number) {
    console.log(employeeId)
    this._Router.navigate(['/employees', employeeId])
  }
}
