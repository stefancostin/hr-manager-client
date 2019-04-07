import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../shared/api.resource';

@Injectable({
  providedIn: 'root'
})
export class CompetenceCenterService {

  public constructor(private http: HttpClient) { }

  public getCompetenceCenters(): Observable<any> {
    const url: string = `${BASE_URL}/competence-centers`;
    return this.http.get(url);
  }

  public addCompetenceCenter(entity): Observable<any> {
    const url: string = `${BASE_URL}/competence-centers`;
    return this.http.post(url, entity);
  }

  public updateCompetenceCenter(entity): Observable<any> {
    const url: string = `${BASE_URL}/competence-centers/${entity.id}`;
    return this.http.put(url, entity);
  }

  public deleteCompetenceCenter(entity): Observable<any> {
    const url: string = `${BASE_URL}/competence-centers/${entity.id}`;
    return this.http.delete(url);
  }

}
