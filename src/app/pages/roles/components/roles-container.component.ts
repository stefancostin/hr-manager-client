import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NbDialogService } from '@nebular/theme';

import { NotificationService } from '../../shared/services/notification.service';
import { ConfirmationComponent } from '../../shared/components/confirmation.component';
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

  tableConfig: RolesTableSettings = new RolesTableSettings();
  source: LocalDataSource = new LocalDataSource();

  public constructor(
    private roleService: RoleService,
    private notificationService: NotificationService,
    private dialogService: NbDialogService
    ) { }

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

  public deleteItem(): void {
    this.onDeleteConfirm(event);

    this.dialogService.open(ConfirmationComponent);
  }

  public onDeleteConfirm(event): void {
    // if (window.confirm('Are you sure you want to delete?')) {
    //   event.confirm.resolve();
    // } else {
    //   event.confirm.reject();
    // }
    // console.log('delete event', event);

    
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
