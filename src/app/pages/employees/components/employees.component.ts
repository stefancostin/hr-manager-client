import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';

import { SmartTableData } from '../../../@core/data/smart-table';
import { EmployeesTableSettings } from './employees.settings';
import * as moment from 'moment';

@Component({
  selector: 'hr-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  public settings: any;
  public tableView: boolean;

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
  }

  openCreateForm(event): void {
    this.tableView = false;
  }

  openTableView(): void {
    this.tableView = true;
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
