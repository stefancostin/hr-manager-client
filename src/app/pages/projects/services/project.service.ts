import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../shared/api.resource';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public constructor(private http: HttpClient) { }

  public getProjects(): Observable<any> {
    const url: string = `${BASE_URL}/projects`;
    return this.http.get(url);
  }

  public addProject(entity): Observable<any> {
    const url: string = `${BASE_URL}/projects`;
    return this.http.post(url, entity);
  }

  public updateProject(entity): Observable<any> {
    const url: string = `${BASE_URL}/projects/${entity.id}`;
    return this.http.put(url, entity);
  }

  public deleteProject(entity): Observable<any> {
    const url: string = `${BASE_URL}/projects/${entity.id}`;
    return this.http.delete(url);
  }

}
