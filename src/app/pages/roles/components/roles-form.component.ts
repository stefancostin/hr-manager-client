import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { IRole, TransferObject } from '../role.model';
import { RoleService } from '../services/role.service';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss']
})
export class RolesFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;
  public rolesForm: FormGroup;

  public constructor(private fb: FormBuilder, private roleService: RoleService) { }

  public ngOnInit(): void {
    // console.log(this.transferData);
    this.checkActionOnInit();
  }

  /**
   * Creates a new entity of the Role type.
   * Event: Binds to the ADD ROLE button.
   */
  public createEntity() {

  }

  /**
   * Edits the current entity of type Role.
   * Event: Binds to the EDIT ROLE button.
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
    this.rolesForm = this.fb.group({
      code: null,
      name: null,
      description: null,
      // is_management: null,
    });
  }

}
