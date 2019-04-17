import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../shared/services/notification.service';
import { TeamService } from '../services/team.service';
import { ITeam, TransferObject } from '../team.model';
import { Actions } from '../../shared/actions.enum';

import { CompetenceCenterService } from '../../competence-centers/services/competence-center.service';
import { ICompetenceCenter, CompetenceCenter } from '../../competence-centers/competence-center.model';
import { ProjectService } from '../../projects/services/project.service';
import { IProject } from '../../projects/project.model';
import { IEmployee } from '../../employees/employee.model';

@Component({
  selector: 'hr-teams-form',
  templateUrl: './teams-form.component.html',
  styleUrls: ['./teams-form.component.scss']
})
export class TeamsFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Input() transferData: TransferObject;
  public action: string;
  public teamsForm: FormGroup;
  public data: ITeam;
  public competenceCenters: ICompetenceCenter[];
  public currentCompetenceCenter: ICompetenceCenter;
  public projects: IProject[];
  public currentProjects: IProject[];
  public projectsIdList: Array<number>;
  public employees: IEmployee[];

  public constructor(
  private fb: FormBuilder,
  private teamService: TeamService,
  private projectService: ProjectService,
  private competenceCenterService: CompetenceCenterService,
  private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.checkActionOnInit();
    this.getCompetenceCenters();
    this.getProjects();
    this.getEmployees();
  }

  /**
   * Creates a new entity of the Team type.
   * Event: Binds to the ADD TEAM button.
   */
  public createEntity(): void {
    this.teamService.addTeam(this.teamsForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'team', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'team', this.transferData.formType, 0, message);
    });
  }

  /**
   * Edits the current entity of type Team.
   * Event: Binds to the EDIT TEAM button.
   */
  public editEntity(): void {
    this.teamService.updateTeam(this.teamsForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'team', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'team', this.transferData.formType, 0, message);
    });
  }

  /**
   * Updates data on the Table View before switching screen.
   * Event: Binds to the EDIT button if EDIT is successful.
   */
  public updateDataSource(): void {
    this.refreshData.emit();
  }

  /**
   * Leaves the Form View and navigates to Table View.
   * Event: Binds to the CANCEL button.
   */
  public openTableView(): void {
    this.leave.emit();
  }

  /**
   * Provides a check for the the html template to know what to display
   * and what action should this component take: 'create' or 'edit'.
   *
   * Html template doesn't have access to the Actions enum,
   * so a 'action' string variable has been provided for checks.
   */
  private checkActionOnInit(): void {
    if (this.transferData.formType === Actions.Create) {
      this.action = 'CREATE';
      this.createForm();
    } else if (this.transferData.formType === Actions.Edit) {
      this.action = 'EDIT';
      this.retrieveData();
      this.setCurrentProjects();
      this.createForm();
      this.populateEditForm();
    } else {
      console.error('Action type not defined. "Edit" or "Create" not found inside transfer object.');
    }
  }

  /**
   * Receives list from the server (index).
   */
  private getCompetenceCenters(): void {
    this.currentCompetenceCenter = new CompetenceCenter();

    this.competenceCenterService.getCompetenceCenters().subscribe(resp => {
      this.competenceCenters = resp.data;

      // On Edit
      if (this.transferData.formType === Actions.Edit) {
        this.findCurrentCompetenceCenter();
      }
    });
  }

  /**
   * Iterates through the list received from the server
   * to find what the current selected entity is.
   */
  private findCurrentCompetenceCenter(): void {
    for (let i = 0; i < this.competenceCenters.length; i++) {
      if (this.competenceCenters[i].id === this.data.competence_center_id) {

        // Queue it for the next event loop
        setTimeout(() => {
          this.currentCompetenceCenter = this.competenceCenters[i];
        });
      }
    }
  }

  /**
   * Receives list from the server (index).
   */
  private getProjects(): void {
    this.projectService.getProjects().subscribe(resp => {
      this.projects = resp.data;
      this.setProjectsOnEditForm();
    });
  }

  /**
   * Receives list from the TransferObject.
   * Called inside retrieveData() method.
   */
  private setCurrentProjects(): void {
    this.currentProjects = [];
    this.projectsIdList = [];

    if (this.data.projects.length) {
        this.currentProjects = this.data.projects;
        this.setProjectsIdList();
    }
  }

  /**
   * Process projects list into a collection of
   * ids that will be se stored on the server.
   */
  private setProjectsIdList(): void {
    for (let i = 0; i < this.currentProjects.length; i++) {
      this.projectsIdList.push(this.currentProjects[i].id);
    }
  }

  /**
   * Sets employees array to a state variable
   * to be used inside the html template.
   */
  private getEmployees(): void {
    this.employees = [];
    if (this.transferData.data && this.transferData.data.employees) {
      this.employees = this.data.employees;
    }
  }

  /**
   * Retrieves data from server passed in through the
   * transferData object, from the parent component.
   *
   * Used only for the 'EDIT' action.
   */
  private retrieveData(): void {
    this.data = this.transferData.data;
  }

  /**
   * Creates a blank Reactive Form with validation
   * used for the 'CREATE' and 'EDIT' action.
   *
   * Called inside the checkActionOnInit() method.
   */
  private createForm(): void {
    this.teamsForm = this.fb.group({
      id: [null],
      code: [null, [Validators.required, Validators.maxLength(6), Validators.pattern('^[a-zA-Z0-9]*$')]],
      name: [null, [Validators.required, Validators.maxLength(25)]],
      competence_center_id: [null, [Validators.required]],
      projects: [null]
    });
  }

  /**
   * Populates the blank Reactive Form with
   * data provided by the component's service.
   *
   * Called inside checkActionOnInit() on 'EDIT'.
   */
  private populateEditForm(): void {
    this.teamsForm.setValue({
      id: this.data.id,
      code: this.data.code,
      name: this.data.name,
      competence_center_id: this.data.competence_center_id,
      projects: this.projectsIdList
    });
  }

  /**
   * Called asynchronously to update the
   * selected project checkboxes.
   *
   * Called inside setCurrentProjects()
   */
  private setProjectsOnEditForm(): void {
    setTimeout(() => {
      this.teamsForm.patchValue({
        projects: this.projectsIdList
      });
    });
  }

}
