import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

import { ConfirmationComponent } from '../../shared/components/confirmation.component';
import { ConfirmationService } from '../../shared/services/confirmation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ProjectService } from '../services/project.service';
import { ProjectsTableSettings } from '../projects.settings';
import { IProject, TransferObject } from '../project.model';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.scss']
})
export class ProjectsContainerComponent implements OnInit {
  public settings: any;
  public tableView: boolean;
  public showTable: boolean;
  public showForm: boolean;
  public transferData: TransferObject;
  private selectedItem: IProject;

  tableConfig: ProjectsTableSettings = new ProjectsTableSettings();
  source: LocalDataSource = new LocalDataSource();

  public constructor(
    private projectService: ProjectService,
    private dialogService: NbDialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    ) {
      this.confirmationService.getProjectDeleteConfirm().subscribe(resp => {
        this.onDeleteConfirm();
      });
  }

  public ngOnInit() {
    this.tableView = true;
    this.showTable = true;
    this.showForm = false;
    this.transferData = new TransferObject();
    this.settings = this.tableConfig.settings;
    this.getProjects();
  }

  /**
   * Changes to Table View -- Back to Table
   * Event is Emitted from Projects Table
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
   * Event is Emitted from Projects Table
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
      this.projectService.deleteProject(this.selectedItem).subscribe(resp => {
        this.getProjects();
        this.notificationService.showToast('success', 'project', Actions.Delete, 3000);
      }, err => {
        const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
        this.notificationService.showToast('danger', 'project', Actions.Delete, 0, message);
      });
    } else {
      console.error('This item could not be selected for deletion.');
    }
  }

  /**
   * Receives list from the server (index).
   */
  private getProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.source.load(projects.data);
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
   * @param data = Project Entity. Passed only on EDIT action
   */
  private buildTransferObject(action: number, data?: IProject): TransferObject {
    let transferObject: TransferObject;
    switch (action) {
      case Actions.Create: {
        transferObject = {
          'formType': action,
          'data': data
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
