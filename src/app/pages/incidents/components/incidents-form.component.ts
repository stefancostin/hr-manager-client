import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../shared/services/notification.service';
import { IncidentService } from '../services/incident.service';
import { IIncident, TransferObject } from '../incident.model';
import { Actions } from '../../shared/actions.enum';

import { EmployeeService } from '../../employees/services/employee.service';
import { IEmployee, Employee } from '../../employees/employee.model';
import { ProjectService } from '../../projects/services/project.service';
import { IProject, Project } from '../../projects/project.model';

@Component({
  selector: 'hr-incidents-form',
  templateUrl: './incidents-form.component.html',
  styleUrls: ['./incidents-form.component.scss']
})
export class IncidentsFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;
  public incidentsForm: FormGroup;
  public data: IIncident;
  public employees: IEmployee[];
  public currentEmployee: IEmployee;
  public projects: IProject[];
  public currentProject: IProject;
  private isProjectSelected: boolean;

  public constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private notificationService: NotificationService
    ) { }

  public ngOnInit(): void {
    this.checkActionOnInit();
    this.getProjects();
    this.checkProjectSelection();
    // Change this in EDIT and call it when user changes the selected project
    // this.getEmployees();
  }

  /**
   * Creates a new entity of the Incident type.
   * Event: Binds to the ADD INCIDENT button.
   */
  public createEntity(): void {
    this.incidentService.addIncident(this.incidentsForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'incident', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'incident', this.transferData.formType, 0, message);
    });
  }

  /**
   * Edits the current entity of type Incident.
   * Event: Binds to the EDIT INCIDENT button.
   */
  public editEntity(): void {
    this.incidentService.updateIncident(this.incidentsForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'incident', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'incident', this.transferData.formType, 0, message);
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
   *
   * It runs only when a project is selected,
   * and then it fetches all the employees that
   * are assigend to the selected project.
   */
  private getEmployees(): void {
    this.currentEmployee = new Employee();
    this.employees = [new Employee()];

    // Check if any project is selected first
    if (this.incidentsForm.controls.project_id.value) {
      this.projectService.getProjectMembers(this.incidentsForm.controls.project_id.value).subscribe(resp => {
        this.employees = resp.data;
        console.log('here', resp.data);

        // On Edit
        if (this.transferData.formType === Actions.Edit) {
          this.findCurrentEmployee();
        }
      });
    }
  }

  /**
   * Iterates through the list received from the server
   * to find what the current selected entity is.
   */
  private findCurrentEmployee(): void {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === this.data.employee_id) {

        // Queue it for the next event loop
        setTimeout(() => {
          this.currentEmployee = this.employees[i];
        });
      }
    }
  }

  /**
   * Receives list from the server (index).
   */
  private getProjects(): void {
    this.currentProject = new Project();

    this.projectService.getProjects().subscribe(resp => {
      this.projects = resp.data;

      // On Edit
      if (this.transferData.formType === Actions.Edit) {
        this.findCurrentProject();
      }
    });
  }

  /**
   * Iterates through the list received from the server
   * to find what the current selected entity is.
   */
  private findCurrentProject(): void {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === this.data.project_id) {

        // Queue it for the next event loop
        setTimeout(() => {
          this.currentProject = this.projects[i];
        });
      }
    }
  }

  /**
   * Checks if a project is selected in order to call the service
   * that retrieves all the employees assigned to the project.
   */
  private checkProjectSelection(): void {
    this.isProjectSelected = !!this.incidentsForm.controls.project_id.value;
    if (this.isProjectSelected) {
      this.getEmployees();
    } else {
      this.currentEmployee = new Employee();
      this.employees = [new Employee()];
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
    this.incidentsForm = this.fb.group({
      id: [null],
      code: [null, [Validators.required, Validators.maxLength(3), Validators.pattern('^[a-zA-Z0-9]*$')]],
      subject: [null, [Validators.required, Validators.maxLength(25)]],
      description: [null, [Validators.required, Validators.maxLength(200)]],
      project_id: [null, [Validators.required]],
      employee_id: [
        {value: null, disabled: this.isProjectSelected},
        [Validators.required]
      ],
    });
  }

  /**
   * Populates the blank Reactive Form with
   * data provided by the component's service.
   *
   * Called inside checkActionOnInit() on 'EDIT'.
   */
  private populateEditForm(): void {
    this.incidentsForm.setValue({
      id: this.data.id,
      code: this.data.code,
      subject: this.data.subject,
      description: this.data.description,
      project_id: this.data.project_id,
      employee_id: this.data.employee_id,
    });
  }

}
