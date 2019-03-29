import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';

import { SmartTableData } from '../../../@core/data/smart-table';
import { EmployeesTableSettings } from './employees.settings';

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
  }

  /**
   * Changes to Forms View
   * Timeout included for Opacity Animation
   */
  openCreateForm(event): void {
    this.showTable = false;
    setTimeout(() => {
      this.tableView = false;
      setTimeout(() => {
        this.showForm = true;
      }, 250);
    }, 250);
  }

  /**
   * Changes to Table View
   * Event is Emitted from Employees Table
   * Timeout included for Opacity Animation
   */
  openTableView(): void {
    this.showForm = false;
    setTimeout(() => {
      this.tableView = true;
      setTimeout(() => {
        this.showTable = true;
      }, 250);
    }, 250);
  }

  editItem(): void {
    console.log('edit');
  }

  deleteItem(): void {
    console.log('delete');
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
