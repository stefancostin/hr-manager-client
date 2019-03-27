import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';

import { SmartTableData } from '../../../@core/data/smart-table';
import { EmployeesTableSettings } from './employees.settings';

@Component({
  selector: 'hr-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  public settings: any;
  public tableView: boolean;
  public min: Date;
  public max: Date;

  tableConfig: EmployeesTableSettings = new EmployeesTableSettings();
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, protected dateService: NbDateService<Date>) {
    // Data Source
    const data = this.service.getData();
    this.source.load(data);
    // Table Configuration
    this.settings = this.tableConfig.settings;
    // Datepicker
    this.min = this.dateService.addDay(this.dateService.today(), -3652);
    this.max = this.dateService.addDay(this.dateService.today(), 60);
  }

  ngOnInit() {
    // this.tableView = true;
    this.tableView = false;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
