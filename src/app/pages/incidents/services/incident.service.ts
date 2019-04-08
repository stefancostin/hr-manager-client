import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../shared/api.resource';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  public constructor(private http: HttpClient) { }

  public getIncidents(): Observable<any> {
    const url: string = `${BASE_URL}/incidents`;
    return this.http.get(url);
  }

  public addIncident(entity): Observable<any> {
    const url: string = `${BASE_URL}/incidents`;
    return this.http.post(url, entity);
  }

  public updateIncident(entity): Observable<any> {
    const url: string = `${BASE_URL}/incidents/${entity.id}`;
    return this.http.put(url, entity);
  }

  public deleteIncident(entity): Observable<any> {
    const url: string = `${BASE_URL}/incidents/${entity.id}`;
    return this.http.delete(url);
  }

}
