import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';

import { SmartTableData } from '../../../@core/data/smart-table';
import { CompetenceCentersTableSettings } from '../competence-centers.settings';
import { ICompetenceCenter, TransferObject } from '../competence-center.model';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'ngx-competence-centers-container',
  templateUrl: './competence-centers-container.component.html',
  styleUrls: ['./competence-centers-container.component.scss']
})
export class CompetenceCentersContainerComponent implements OnInit {
  public settings: any;
  public tableView: boolean;
  public showTable: boolean;
  public showForm: boolean;
  // public transferData: TransferObject;
  public transferData: Object;

  tableConfig: CompetenceCentersTableSettings = new CompetenceCentersTableSettings();
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
   * Event is Emitted from Competence Centers Table
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
   * Event is Emitted from Competence Centers Table
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
   * @param data = Competence Center Entity. Passed only on EDIT action
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
