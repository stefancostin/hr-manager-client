import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private competenceCenterSubject = new Subject<any>();
  private computerSubject = new Subject<any>();
  private employeeSubject = new Subject<any>();
  private incidentSubject = new Subject<any>();
  private projectSubject = new Subject<any>();
  private roleSubject = new Subject<any>();
  private teamSubject = new Subject<any>();

  constructor() { }

  public confirmDeleteCompetenceCenter() {
    this.competenceCenterSubject.next(true);
  }

  public getCompetenceCenterDeleteConfirm() {
    return this.competenceCenterSubject.asObservable();
  }

  public confirmDeleteComputer() {
    this.computerSubject.next(true);
  }

  public getComputerDeleteConfirm() {
    return this.computerSubject.asObservable();
  }

  public confirmDeleteEmployee() {
    this.employeeSubject.next(true);
  }

  public getEmployeeDeleteConfirm() {
    return this.employeeSubject.asObservable();
  }

  public confirmDeleteIncident() {
    this.incidentSubject.next(true);
  }

  public getIncidentDeleteConfirm() {
    return this.incidentSubject.asObservable();
  }

  public confirmDeleteProject() {
    this.projectSubject.next(true);
  }

  public getProjectDeleteConfirm() {
    return this.projectSubject.asObservable();
  }

  public confirmDeleteRole() {
    this.roleSubject.next(true);
  }

  public getRoleDeleteConfirm() {
    return this.roleSubject.asObservable();
  }

  public confirmDeleteTeam() {
    this.teamSubject.next(true);
  }

  public getTeamDeleteConfirm() {
    return this.teamSubject.asObservable();
  }

}
