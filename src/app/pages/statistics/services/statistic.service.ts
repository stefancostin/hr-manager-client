import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { BASE_URL } from '../../shared/api.resource';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  public constructor(private http: HttpClient) { }

  public getTeamActivity(): Observable<any> {
    const url: string = `${BASE_URL}/statistics/team-activity`;
    return this.http.get(url);
  }

  public getProjectActivity(): Observable<any> {
    const url: string = `${BASE_URL}/statistics/project-activity`;
    return this.http.get(url);
  }

  public getTotalIncidents(): Observable<any> {
    const url: string = `${BASE_URL}/statistics/total-incidents`;
    return this.http.get(url);
  }

  public getAssignedEmployees(): Observable<any> {
    const url: string = `${BASE_URL}/statistics/assigned-employees`;
    return this.http.get(url);
  }

  public getTimelineChart(): Observable<any> {
    const url: string = `${BASE_URL}/statistics/timeline-chart`;
    return this.http.get(url);
  }

  public getCompareChart(): Observable<any> {
    const url: string = `${BASE_URL}/statistics/compare-chart`;
    return this.http.get(url);
  }

}
