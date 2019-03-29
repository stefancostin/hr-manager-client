import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';

import { SmartTableData } from '../../../@core/data/smart-table';
import { EmployeesTableSettings } from '../employees.settings';
import { IEmployee, TransferObject, Actions } from '../employee.model';

@Component({
  selector: 'hr-employees',
  templateUrl: './employees-container.component.html',
  styleUrls: ['./employees-container.component.scss']
})
export class EmployeesContainerComponent implements OnInit {
  public settings: any;
  public tableView: boolean;
  public showTable: boolean;
  public showForm: boolean;
  // public transferData: TransferObject;
  public transferData: Object;

  tableConfig: EmployeesTableSettings = new EmployeesTableSettings();
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, protected dateService: NbDateService<Date>) {
    // Data Source
    const data = this.service.getData();
    this.source.load(data);
    // Table Configuration
    this.settings = this.tableConfig.settings;
  }

  ngOnInit() {
    this.tableView = true;
    this.showTable = true;
    this.showForm = false;
    this.transferData = {};
  }

  /**
   * Changes to Table View -- Back to Table
   * Event is Emitted from Employees Table
   * Timeout included for Opacity Animation
   */
  openTableView(): void {
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
  openCreateForm(event): void {
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
   * Event is Emitted from Employees Table
   * Timeout included for Opacity Animation
   */
  editItem(event): void {
    // console.log(event.data);
    this.transferData = this.buildTransferObject(Actions.Edit, event.data);

    this.showTable = false;
    setTimeout(() => {
      this.tableView = false;
      setTimeout(() => {
        this.showForm = true;
      }, 150);
    }, 300);
  }

  deleteItem(): void {

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  private buildTransferObject(action: number, data?: Object) {
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
