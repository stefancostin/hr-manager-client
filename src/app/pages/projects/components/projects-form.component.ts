import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../shared/services/notification.service';
import { ProjectService } from '../services/project.service';
import { IProject, TransferObject } from '../project.model';
import { Actions } from '../../shared/actions.enum';

import { TeamService } from '../../teams/services/team.service';
import { ITeam, Team } from '../../teams/team.model';

@Component({
  selector: 'hr-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.scss']
})
export class ProjectsFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Input() transferData: TransferObject;
  public action: string;
  public projectsForm: FormGroup;
  public data: IProject;
  public teams: ITeam[];
  public currentTeams: ITeam[];
  public teamsIdList: Array<number>;

  public constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private teamService: TeamService,
    private notificationService: NotificationService
    ) { }

  public ngOnInit(): void {
    this.checkActionOnInit();
    this.getTeams();
  }

  /**
   * Creates a new entity of the Project type.
   * Event: Binds to the ADD PROJECT button.
   */
  public createEntity(): void {
    this.projectService.addProject(this.projectsForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'project', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'project', this.transferData.formType, 0, message);
    });
  }

  /**
   * Edits the current entity of type Project.
   * Event: Binds to the EDIT PROJECT button.
   */
  public editEntity(): void {
    this.projectService.updateProject(this.projectsForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'project', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'project', this.transferData.formType, 0, message);
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
      this.setCurrentTeams();
      this.createForm();
      this.populateEditForm();
    } else {
      console.error('Action type not defined. "Edit" or "Create" not found inside transfer object.');
    }
  }

  /**
   * Receives list from the server (index).
   */
  private getTeams(): void {
    this.teamService.getTeams().subscribe(resp => {
      this.teams = resp.data;
      this.setTeamsOnEditForm();
    });
  }

  /**
   * Receives list from the TransferObject.
   * Called inside retrieveData() method.
   */
  private setCurrentTeams(): void {
    this.currentTeams = [];
    this.teamsIdList = [];

    if (this.data.teams.length) {
        this.currentTeams = this.data.teams;
        this.setTeamsIdList();
    }
  }

  /**
   * Process teams list into a collection of
   * ids that will be se stored on the server.
   */
  private setTeamsIdList(): void {
    for (let i = 0; i < this.currentTeams.length; i++) {
      this.teamsIdList.push(this.currentTeams[i].id);
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
    this.projectsForm = this.fb.group({
      id: [null],
      code: [null, [Validators.required, Validators.maxLength(6), Validators.pattern('^[a-zA-Z0-9]*$')]],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      teams: [null]
    });
  }

  /**
   * Populates the blank Reactive Form with
   * data provided by the component's service.
   *
   * Called inside checkActionOnInit() on 'EDIT'.
   */
  private populateEditForm(): void {
    this.projectsForm.setValue({
      id: this.data.id,
      code: this.data.code,
      name: this.data.name,
      teams: this.teamsIdList
    });
  }

    /**
   * Called asynchronously to update the
   * selected project checkboxes.
   *
   * Called inside setCurrentTeams()
   */
  private setTeamsOnEditForm(): void {
    setTimeout(() => {
      this.projectsForm.patchValue({
        teams: this.teamsIdList
      });
    });
  }

}
