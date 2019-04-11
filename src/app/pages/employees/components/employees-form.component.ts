import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../shared/services/notification.service';
import { EmployeeService } from '../services/employee.service';
import { IEmployee, TransferObject } from '../employee.model';
import { Actions } from '../../shared/actions.enum';

import { RoleService } from '../../roles/services/role.service';
import { IRole, Role } from '../../roles/role.model';
import { TeamService } from '../../teams/services/team.service';
import { ITeam, Team } from '../../teams/team.model';

@Component({
  selector: 'hr-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;
  public employeesForm: FormGroup;
  public data: IEmployee;
  public roles: IRole[];
  public currentRole: IRole;
  public teams: ITeam[];
  public currentTeam: ITeam;

  public constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private teamService: TeamService,
    private notificationService: NotificationService
    ) { }

  public ngOnInit(): void {
    this.checkActionOnInit();
    this.getRoles();
    this.getTeams();
  }

  /**
   * Creates a new entity of the Employee type.
   * Event: Binds to the ADD EMPLOYEE button.
   */
  public createEntity(): void {
    console.log(this.employeesForm.value)
    this.employeeService.addEmployee(this.employeesForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'employee', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'employee', this.transferData.formType, 0, message);
    });
  }

  /**
   * Edits the current entity of type Employee.
   * Event: Binds to the EDIT EMPLOYEE button.
   */
  public editEntity(): void {
    this.employeeService.updateEmployee(this.employeesForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'employee', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'employee', this.transferData.formType, 0, message);
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
      this.createForm();
      this.populateEditForm();
    } else {
      console.error('Action type not defined. "Edit" or "Create" not found inside transfer object.');
    }
  }

  /**
   * Receives list from the server (index).
   */
  private getRoles(): void {
    this.currentRole = new Role();

    this.roleService.getRoles().subscribe(resp => {
      this.roles = resp.data;

      // On Edit
      if (this.transferData.formType === Actions.Edit) {
        this.findCurrentRole();
      }
    });
  }

  /**
   * Iterates through the list received from the server
   * to find what the current selected entity is.
   */
  private findCurrentRole(): void {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].id === this.data.role_id) {

        // Queue it for the next event loop
        setTimeout(() => {
          this.currentRole = this.roles[i];
        });
      }
    }
  }

  /**
   * Receives list from the server (index).
   */
  private getTeams(): void {
    this.currentTeam = new Team();

    this.teamService.getTeams().subscribe(resp => {
      this.teams = resp.data;

      // On Edit
      if (this.transferData.formType === Actions.Edit) {
        this.findCurrentTeam();
      }
    });
  }

  /**
   * Iterates through the list received from the server
   * to find what the current selected entity is.
   */
  private findCurrentTeam(): void {
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].id === this.data.team_id) {

        // Queue it for the next event loop
        setTimeout(() => {
          this.currentTeam = this.teams[i];
        });
      }
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
    this.employeesForm = this.fb.group({
      id: [null],
      first_name: [null, [Validators.required, Validators.maxLength(25)]],
      last_name: [null, [Validators.required, Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(25)]],
      hiring_date: [null, [Validators.required]],
      role_id: [null],
      team_id: [null]
    });
  }

  /**
   * Populates the blank Reactive Form with
   * data provided by the component's service.
   *
   * Called inside checkActionOnInit() on 'EDIT'.
   */
  private populateEditForm(): void {
    this.employeesForm.setValue({
      id: this.data.id,
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      email: this.data.email,
      hiring_date: this.data.hiring_date,
      role_id: this.data.role_id,
      team_id: this.data.team_id
    });
  }

}
