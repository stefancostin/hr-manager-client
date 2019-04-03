import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IEmployee, TransferObject } from '../employee.model';
import { EmployeeService } from '../services/employee.service';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;
  public employeesForm: FormGroup;
  public data: IEmployee;

  public constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  public ngOnInit(): void {
    // console.log(this.transferData);
    this.checkActionOnInit();
  }

  /**
   * Creates a new entity of the Employee type.
   * Event: Binds to the ADD EMPLOYEE button.
   */
  public createEntity() {

  }

  /**
   * Edits the current entity of type Employee.
   * Event: Binds to the EDIT EMPLOYEE button.
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
      this.createForm();
      this.populateEditForm();
    } else {
      console.error('Action type not defined. "Edit" or "Create" not found inside transfer object.');
    }
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
