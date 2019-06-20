import { Component, OnInit,Input ,OnChanges,SimpleChanges,Output,EventEmitter} from '@angular/core';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
 @Input() employee :Employee;
 @Output() notify:EventEmitter<string>=new EventEmitter<string>();
  constructor(private _router:Router) { }

  ngOnInit() {
  }
  ngOnChanges(changes:SimpleChanges){
    const  previousEmployee=<Employee>changes.employee.previousValue;
    const  currentEmployee=<Employee>changes.employee.currentValue;
    console.log('Previous :' +(previousEmployee ? previousEmployee.name:'NULL'));
    console.log('current:'+ currentEmployee.name);
  }
  handleClick(){
    this.notify.emit(this.employee.name);
 }
  editEmployee(){
    this._router.navigate(['/edit',this.employee.id])
  }
}
