import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Department } from 'src/app/models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  dateOfBirth: Date = new Date(2018, 0, 30);
  previewPhoto = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee;
  isActive = true;
  departments: Department[] = [
    { id: 1, name: "Help Desk" },
    { id: 2, name: "HR" },
    { id: 3, name: "Manager" },
    { id: 4, name: "Helper" },
    { id: 5, name: "Coader" },
  ]
  Gender = 'male';


  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route:ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        minDate: new Date(2018, 0, 1),
        maxDate: new Date(2018, 11, 31),
        dateInputFormat: 'DD/MM/YY'
      });
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap=>{
      const id =+parameterMap.get('id');
      this.getEmployee(id);
    })
  }
  public getEmployee(id:number){
    if(id===0){
      this.employee={
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null,

      };
    }else{
     console.log(id) 
      this._employeeService.getEmployee(id);
    }

  }
  saveEmployee(): void {
    if (this.employee.id === null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset()
          this._router.navigate(['list']);

        }, (error: any) => console.log(error)
      );

    }
    else {
      this._employeeService.UpdateEmployee(this.employee).subscribe(
        () => {

          this.createEmployeeForm.reset()
          this._router.navigate(['list']);

        }, (error: any) => console.log(error)
      );

    }

  }

}

