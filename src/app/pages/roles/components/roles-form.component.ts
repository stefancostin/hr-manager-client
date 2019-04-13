import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../shared/services/notification.service';
import { RoleService } from '../services/role.service';
import { IRole, TransferObject } from '../role.model';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss']
})
export class RolesFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Input() transferData: TransferObject;
  public action: string;
  public rolesForm: FormGroup;
  public data: IRole;

  public constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private notificationService: NotificationService
    ) { }

  public ngOnInit(): void {
    this.checkActionOnInit();
  }

  /**
   * Creates a new entity of the Role type.
   * Event: Binds to the ADD ROLE button.
   */
  public createEntity(): void {
    this.roleService.addRole(this.rolesForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'role', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'role', this.transferData.formType, 0, message);
    });
  }

  /**
   * Edits the current entity of type Role.
   * Event: Binds to the EDIT ROLE button.
   */
  public editEntity(): void {
    this.roleService.updateRole(this.rolesForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'role', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'role', this.transferData.formType, 0, message);
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
   * Event: Binds to the CANCEL or EDIT button.
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
    this.rolesForm = this.fb.group({
      id: [null],
      code: [null, [Validators.required, Validators.maxLength(6), Validators.pattern('^[a-zA-Z0-9]*$')]],
      name: [null, [Validators.required, Validators.maxLength(25)]],
      description: [null, [Validators.required, Validators.maxLength(25)]],
      is_management: [null],
    });
  }

  /**
   * Populates the blank Reactive Form with
   * data provided by the component's service.
   *
   * Called inside checkActionOnInit() on 'EDIT'.
   */
  private populateEditForm(): void {
    this.rolesForm.setValue({
      id: this.data.id,
      code: this.data.code,
      name: this.data.name,
      description: this.data.description,
      is_management: this.data.is_management
    });
  }

}
