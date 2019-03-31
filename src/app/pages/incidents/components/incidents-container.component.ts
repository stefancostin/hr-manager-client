import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';

import { SmartTableData } from '../../../@core/data/smart-table';
import { IncidentsTableSettings } from '../incidents.settings';
import { IIncident, TransferObject } from '../incident.model';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-incidents-container',
  templateUrl: './incidents-container.component.html',
  styleUrls: ['./incidents-container.component.scss']
})
export class IncidentsContainerComponent implements OnInit {
  public settings: any;
  public tableView: boolean;
  public showTable: boolean;
  public showForm: boolean;
  // public transferData: TransferObject;
  public transferData: Object;

  tableConfig: IncidentsTableSettings = new IncidentsTableSettings();
  source: LocalDataSource = new LocalDataSource();

  public constructor(private service: SmartTableData, protected dateService: NbDateService<Date>) {
    // Data Source
    const data = this.service.getData();
    this.source.load(data);
    // Table Configuration
    this.settings = this.tableConfig.settings;
  }

  public ngOnInit() {
    this.tableView = true;
    this.showTable = true;
    this.showForm = false;
    this.transferData = {};
  }

  /**
   * Changes to Table View -- Back to Table
   * Event is Emitted from Incidents Table
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
   * Event is Emitted from Incidents Table
   * Timeout included for Opacity Animation
   */
  public editItem(event): void {
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

  public deleteItem(): void {

  }

  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
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
   * @param data = Incident Entity. Passed only on EDIT action
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
