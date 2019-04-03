import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IComputer, TransferObject } from '../computer.model';
import { ComputerService } from '../services/computer.service';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-computers-form',
  templateUrl: './computers-form.component.html',
  styleUrls: ['./computers-form.component.scss']
})
export class ComputersFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;
  public computersForm: FormGroup;
  public data: IComputer;

  public constructor(private fb: FormBuilder, private computerService: ComputerService) { }

  public ngOnInit(): void {
    // console.log(this.transferData);
    this.checkActionOnInit();
  }

  /**
   * Creates a new entity of the Computer type.
   * Event: Binds to the ADD COMPUTER button.
   */
  public createEntity() {

  }

  /**
   * Edits the current entity of type Computer.
   * Event: Binds to the EDIT COMPUTER button.
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
    this.computersForm = this.fb.group({
      id: [null],
      employee_id: [null, [Validators.required]],
      operating_system: [null, [Validators.required, Validators.maxLength(25)]],
      cpu: [null, [Validators.required, Validators.maxLength(6)]],
      ram: [null, [Validators.required, Validators.maxLength(6)]],
      hdd: [null, [Validators.required, Validators.maxLength(6)]],
    });
  }

  /**
   * Populates the blank Reactive Form with
   * data provided by the component's service.
   *
   * Called inside checkActionOnInit() on 'EDIT'.
   */
  private populateEditForm(): void {
    this.computersForm.setValue({
      id: this.data.id,
      employee_id: this.data.employee_id,
      operating_system: this.data.operating_system,
      cpu: this.data.cpu,
      ram: this.data.ram,
      hdd: this.data.hdd
    });
  }

}
