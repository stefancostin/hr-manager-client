import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IIncident, TransferObject } from '../incident.model';
import { IncidentService } from '../services/incident.service';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-incidents-form',
  templateUrl: './incidents-form.component.html',
  styleUrls: ['./incidents-form.component.scss']
})
export class IncidentsFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;
  public incidentsForm: FormGroup;
  public data: IIncident;

  public constructor(private fb: FormBuilder, private incidentService: IncidentService) { }

  public ngOnInit(): void {
    // console.log(this.transferData);
    this.checkActionOnInit();
  }

  /**
   * Creates a new entity of the Incident type.
   * Event: Binds to the ADD INCIDENT button.
   */
  public createEntity() {

  }

  /**
   * Edits the current entity of type Incident.
   * Event: Binds to the EDIT INCIDENT button.
   */
  public editEntity() {

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
      employee_id: [null, [Validators.required]],
      project_id: [null, [Validators.required]]
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
      employee_id: this.data.employee_id,
      project_id: this.data.project_id
    });
  }

}
