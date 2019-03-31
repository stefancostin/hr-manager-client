import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    } else {
      console.error('Action type not defined. "Edit" or "Create" not found inside transfer object.');
    }
  }

  /**
   * Creates a blank Reactive Form with validation
   * used for the 'CREATE' action.
   *
   * Called inside the checkActionOnInit() method
   * based on the action type of the component.
   */
  private createForm(): void {
    this.incidentsForm = this.fb.group({
      code: null,
      subject: null,
      description: null,
      employee_id: null,
      team_id: null,
    });
  }

}
