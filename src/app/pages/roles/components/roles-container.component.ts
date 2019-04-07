import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NbDialogService } from '@nebular/theme';

import { ConfirmationComponent } from '../../shared/components/confirmation.component';
import { ConfirmationService } from '../../shared/services/confirmation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { RolesTableSettings } from '../roles.settings';
import { RoleService } from '../services/role.service';
import { IRole, TransferObject } from '../role.model';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-roles-container',
  templateUrl: './roles-container.component.html',
  styleUrls: ['./roles-container.component.scss']
})
export class RolesContainerComponent implements OnInit {
  public settings: any;
  public tableView: boolean;
  public showTable: boolean;
  public showForm: boolean;
  // public transferData: TransferObject;
  public transferData: Object;
  private selectedItem: IRole;

  tableConfig: RolesTableSettings = new RolesTableSettings();
  source: LocalDataSource = new LocalDataSource();

  public constructor(
    private roleService: RoleService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private dialogService: NbDialogService
    ) {
      this.confirmationService.getRoleDeleteConfirm().subscribe(resp => {
        this.onDeleteConfirm();
      });
    }

  public ngOnInit() {
    // Table View
    this.tableView = true;
    this.showTable = true;
    this.showForm = false;
    this.transferData = {};
    // Table Data Config
    this.settings = this.tableConfig.settings;
    // Table Data Source
    this.getRoles();
  }

  /**
   * Changes to Table View -- Back to Table
   * Event is Emitted from Roles Table
   * Timeout included for Opacity Animation
   */
  public openTableView(): void {
    this.showForm = false;
    setTimeout(() => {
      this.tableView = true;
      setTimeout(() => {
        this.showTable = true;
      }, 150);
    }, 300);
  }

  /**
   * Changes to Forms View -- CREATE
   * Timeout included for Opacity Animation
   */
  public openCreateForm(event): void {
    this.transferData = this.buildTransferObject(Actions.Create);

    this.showTable = false;
    setTimeout(() => {
      this.tableView = false;
      setTimeout(() => {
        this.showForm = true;
      }, 150);
    }, 300);
  }

  /**
   * Changes to Forms View -- EDIT
   * Event is Emitted from Roles Table
   * Timeout included for Opacity Animation
   */
  public editItem(event): void {
    this.transferData = this.buildTransferObject(Actions.Edit, event.data);

    this.showTable = false;
    setTimeout(() => {
      this.tableView = false;
      setTimeout(() => {
        this.showForm = true;
      }, 150);
    }, 300);
  }

  /**
   * Method is binded to the delete button.
   * It opens up the delete confirmation box.
   *
   * @param event = selected row
   */
  public deleteItem(event): void {
    this.selectedItem = event.data;
    const dialogRef = this.dialogService.open(ConfirmationComponent);
  }

  /**
   * Method deletes the selected row (entity).
   *
   * It is called from the constructor, after the component
   * receives a confirmation from the confirmation-box, sent
   * through the confirmation service (publish-subscribe).
   */
  private onDeleteConfirm(): void {
    if (this.selectedItem !== undefined) {
      this.roleService.deleteRole(this.selectedItem).subscribe(resp => {
        this.getRoles();
        this.notificationService.showToast('success', 'role', Actions.Delete, 3000);
      }, err => {
        const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
        this.notificationService.showToast('danger', 'role', Actions.Delete, 0, message);
      });
    } else {
      console.error('This item could not be selected for deletion.');
    }
  }

  /**
   * Receives roles list frome the server.
   */
  private getRoles(): void {
    this.roleService.getRoles().subscribe(roles => {
      this.source.load(roles.data);
    });
  }

  /**
   * Method creates a TransferObject entity used to
   * pass data from the Table View to the Form View.
   *
   * The TransferObject always includes a 'formType' attribute which specifies
   * the type of action(@param) which the Form should take: 'EDIT' or 'CREATE'
   *
   * In case of 'EDIT', the editable entity is passed to the TransferObject
   * on the 'data' attribute, passed inside the function through the data @param.
   *
   * @param action = Actions enum <number>
   * @param data = Role Entity. Passed only on EDIT action
   */
  private buildTransferObject(action: number, data?: Object): Object {
    let transferObject: Object;
    switch (action) {
      case Actions.Create: {
        transferObject = {
          'formType': action
        };
        return transferObject;
      }
      case Actions.Edit: {
        transferObject = {
          'formType': action,
          'data': data
        };
        return transferObject;
      }
      default: {
        console.error('Action type not defined. Did you mean "Edit" or "Create"?');
      }
    }
  }

}
