import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) { }
  private listEmployees: Employee[] = [

  ];
  baseURL = "http://localhost:3000/employees"
  getEmployees(): Observable<Employee[]> {

    return this.httpClient.get<Employee[]>(this.baseURL)
    // .pipe(catchError(this.handleError));

  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('client Side Error ', errorResponse.error.message);
    } else {
      console.error('Server Side Error ', errorResponse);
    }
    return new ErrorObservable();
  }
  getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`)
    .pipe(catchError(this.handleError));
  }


  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseURL, employee, {
      headers: new HttpHeaders({
        'content-type': 'application/JSON'
      })
    })
      .pipe(catchError(this.handleError));

 }

  UpdateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseURL}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'content-type': 'application/JSON'
      })
    })
      .pipe(catchError(this.handleError));
  }
}