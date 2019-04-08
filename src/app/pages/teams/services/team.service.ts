import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../shared/api.resource';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public constructor(private http: HttpClient) { }

  public getTeams(): Observable<any> {
    const url: string = `${BASE_URL}/teams`;
    return this.http.get(url);
  }

  public addTeam(entity): Observable<any> {
    const url: string = `${BASE_URL}/teams`;
    return this.http.post(url, entity);
  }

  public updateTeam(entity): Observable<any> {
    const url: string = `${BASE_URL}/teams/${entity.id}`;
    return this.http.put(url, entity);
  }

  public deleteTeam(entity): Observable<any> {
    const url: string = `${BASE_URL}/teams/${entity.id}`;
    return this.http.delete(url);
  }

}
