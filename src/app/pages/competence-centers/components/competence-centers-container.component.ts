import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

import { ConfirmationComponent } from '../../shared/components/confirmation.component';
import { ConfirmationService } from '../../shared/services/confirmation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { CompetenceCentersTableSettings } from '../competence-centers.settings';
import { CompetenceCenterService } from '../services/competence-center.service';
import { ICompetenceCenter, TransferObject } from '../competence-center.model';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-competence-centers-container',
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
  private selectedItem: ICompetenceCenter;

  tableConfig: CompetenceCentersTableSettings = new CompetenceCentersTableSettings();
  source: LocalDataSource = new LocalDataSource();

  public constructor(
    private competenceCenterService: CompetenceCenterService,
    private dialogService: NbDialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
    ) {
      this.confirmationService.getCompetenceCenterDeleteConfirm().subscribe(resp => {
        this.onDeleteConfirm();
      });
    }

  public ngOnInit() {
    this.tableView = true;
    this.showTable = true;
    this.showForm = false;
    this.transferData = {};
    this.settings = this.tableConfig.settings;
    this.getCompetenceCenters();
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
      this.competenceCenterService.deleteCompetenceCenter(this.selectedItem).subscribe(resp => {
        this.getCompetenceCenters();
        this.notificationService.showToast('success', 'competence center', Actions.Delete, 3000);
      }, err => {
        const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
        this.notificationService.showToast('danger', 'competence center', Actions.Delete, 0, message);
      });
    } else {
      console.error('This item could not be selected for deletion.');
    }
  }

  /**
   * Receives list from the server (index).
   */
  private getCompetenceCenters(): void {
    this.competenceCenterService.getCompetenceCenters().subscribe(competenceCenters => {
      this.source.load(competenceCenters.data);
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
