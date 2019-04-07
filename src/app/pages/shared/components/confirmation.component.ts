import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

import { ConfirmationService } from '../services/confirmation.service';
import { Actors } from '../actors.enum';

@Component({
  selector: 'hr-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  public entity: string;
  private route: string;

  constructor(
    protected dialogRef: NbDialogRef<ConfirmationComponent>,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.route = this.router.url;
    if (this.route.includes('competence-centers')) {
      this.entity = Actors.CompetenceCenter;
    } else if (this.route.includes('computers')) {
      this.entity = Actors.Computer;
    } else if (this.route.includes('employees')) {
      this.entity = Actors.Employee;
    } else if (this.route.includes('incidents')) {
      this.entity = Actors.Incident;
    } else if (this.route.includes('projects')) {
      this.entity = Actors.Project;
    } else if (this.route.includes('roles')) {
      this.entity = Actors.Role;
    } else if (this.route.includes('teams')) {
      this.entity = Actors.Team;
    } else {
      this.entity = 'item';
      console.error('Could not read actor from route.');
    }
  }

  delete() {
    switch (this.entity) {
      case Actors.CompetenceCenter:
        this.confirmationService.confirmDeleteCompetenceCenter();
        break;
      case Actors.Computer:
        this.confirmationService.confirmDeleteComputer();
        break;
      case Actors.Employee:
        this.confirmationService.confirmDeleteIncident();
        break;
      case Actors.Incident:
        this.confirmationService.confirmDeleteIncident();
        break;
      case Actors.Project:
        this.confirmationService.confirmDeleteProject();
        break;
      case Actors.Role:
        this.confirmationService.confirmDeleteRole();
        break;
      case Actors.Team:
        this.confirmationService.confirmDeleteTeam();
        break;
      default:
        console.error('Can not reach service for this particular actor.');
    }

    // Close the Confirmation Box
    this.dialogRef.close();
   }

}
