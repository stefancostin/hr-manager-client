import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../shared/api.resource';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public constructor(private http: HttpClient) { }

  public getRoles(): Observable<any> {
    const url: string = `${BASE_URL}/roles`;
    return this.http.get(url);
  }

  public addRole(entity): Observable<any> {
    const url: string = `${BASE_URL}/roles`;
    return this.http.post(url, entity);
  }

  public updateRole(entity): Observable<any> {
    const url: string = `${BASE_URL}/roles/${entity.id}`;
    return this.http.put(url, entity);
  }

  public deleteRole(entity): Observable<any> {
    const url: string = `${BASE_URL}/roles/${entity.id}`;
    return this.http.delete(url);
  }

}
