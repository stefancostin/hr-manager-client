import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../shared/api.resource';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public constructor(private http: HttpClient) { }

  public getEmployees(): Observable<any> {
    const url: string = `${BASE_URL}/employees`;
    return this.http.get(url);
  }

  public addEmployee(entity): Observable<any> {
    const url: string = `${BASE_URL}/employees`;
    return this.http.post(url, entity);
  }

  public updateEmployee(entity): Observable<any> {
    const url: string = `${BASE_URL}/employees/${entity.id}`;
    return this.http.put(url, entity);
  }

  public deleteEmployee(entity): Observable<any> {
    const url: string = `${BASE_URL}/employees/${entity.id}`;
    return this.http.delete(url);
  }

  public getEmployeesWithoutComputer(): Observable<any> {
    const url: string = `${BASE_URL}/employees-without-computer`;
    return this.http.get(url);
  }

}
