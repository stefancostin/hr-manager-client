import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../shared/api.resource';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  public constructor(private http: HttpClient) { }

  public getComputers(): Observable<any> {
    const url: string = `${BASE_URL}/computers`;
    return this.http.get(url);
  }

  public addComputer(entity): Observable<any> {
    const url: string = `${BASE_URL}/computers`;
    return this.http.post(url, entity);
  }

  public updateComputer(entity): Observable<any> {
    const url: string = `${BASE_URL}/computers/${entity.id}`;
    return this.http.put(url, entity);
  }

  public deleteComputer(entity): Observable<any> {
    const url: string = `${BASE_URL}/computers/${entity.id}`;
    return this.http.delete(url);
  }

}
