import { Injectable} from '@angular/core'
import{ CanDeactivate }from'@angular/router';
import{CreateEmployeeComponent} from './create-employee.component';



@Injectable()
 export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent>{
     canDeactivate(component:CreateEmployeeComponent):boolean{
         if(component.createEmployeeForm.dirty){
            return confirm("Are You Sure , You want to leave This Page?")
         }
         return true;
     }
 }