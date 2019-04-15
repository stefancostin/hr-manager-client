import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

import { ConfirmationComponent } from '../../shared/components/confirmation.component';
import { ConfirmationService } from '../../shared/services/confirmation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ComputerService } from '../services/computer.service';
import { ComputersTableSettings } from '../computers.settings';
import { IComputer, TransferObject } from '../computer.model';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-computers-container',
  templateUrl: './computers-container.component.html',
  styleUrls: ['./computers-container.component.scss']
})
export class ComputersContainerComponent implements OnInit {
  public settings: any;
  public tableView: boolean;
  public showTable: boolean;
  public showForm: boolean;
  public transferData: TransferObject;
  private selectedItem: IComputer;

  tableConfig: ComputersTableSettings = new ComputersTableSettings();
  source: LocalDataSource = new LocalDataSource();

  public constructor(
    private computerService: ComputerService,
    private dialogService: NbDialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    ) {
      this.confirmationService.getComputerDeleteConfirm().subscribe(resp => {
        this.onDeleteConfirm();
      });
  }

  public ngOnInit() {
    this.tableView = true;
    this.showTable = true;
    this.showForm = false;
    this.transferData = new TransferObject();
    this.settings = this.tableConfig.settings;
    this.getComputers();
  }

  /**
   * Changes to Table View -- Back to Table
   * Event is Emitted from Computers Table
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
   * Event is Emitted from Computers Table
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
      this.computerService.deleteComputer(this.selectedItem).subscribe(resp => {
        this.getComputers();
        this.notificationService.showToast('success', 'computer', Actions.Delete, 3000);
      }, err => {
        const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
        this.notificationService.showToast('danger', 'computer', Actions.Delete, 0, message);
      });
    }
  }

  /**
   * Receives list from the server (index).
   */
  private getComputers(): void {
    this.computerService.getComputers().subscribe(computers => {
      this.source.load(computers.data);
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
   * @param data = Computer Entity. Passed only on EDIT action
   */
  private buildTransferObject(action: number, data?: IComputer): TransferObject {
    let transferObject: TransferObject;
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
