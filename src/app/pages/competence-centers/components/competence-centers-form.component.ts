import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../shared/services/notification.service';
import { CompetenceCenterService } from '../services/competence-center.service';
import { ICompetenceCenter, TransferObject } from '../competence-center.model';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-competence-centers-form',
  templateUrl: './competence-centers-form.component.html',
  styleUrls: ['./competence-centers-form.component.scss']
})
export class CompetenceCentersFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;
  public competenceCentersForm: FormGroup;
  public data: ICompetenceCenter;

  public constructor(
    private fb: FormBuilder,
    private competenceCenterService: CompetenceCenterService,
    private notificationService: NotificationService
    ) { }

  public ngOnInit(): void {
    this.checkActionOnInit();
  }

  /**
   * Creates a new entity of the Competence Center type.
   * Event: Binds to the ADD COMPETENCE CENTER button.
   */
  public createEntity(): void {
    this.competenceCenterService.addCompetenceCenter(this.competenceCentersForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'competence center', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'competence center', this.transferData.formType, 0, message);
    });
  }

  /**
   * Edits the current entity of type Competence Center.
   * Event: Binds to the EDIT COMPETENCE CENTER button.
   */
  public editEntity(): void {
    this.competenceCenterService.updateCompetenceCenter(this.competenceCentersForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'competence center', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'competence center', this.transferData.formType, 0, message);
    });
  }

  /**
   * Updates data on the Table View before switching screen.
   * Event: Binds to the EDIT button if EDIT is successful.
   */
  public updateDataSource(): void {
    this.refreshData.emit();
  }

  /**
   * Leaves the Form View and navigates to Table View.
   * Event: Binds to the CANCEL button.
   */
  public openTableView(): void {
    this.leave.emit();
  }

  /**
   * Provides a check for the the html template to know what to display
   * and what action should this component take: 'create' or 'edit'.
   *
   * Html template doesn't have access to the Actions enum,
   * so a 'action' string variable has been provided for checks.
   */
  private checkActionOnInit(): void {
    if (this.transferData.formType === Actions.Create) {
      this.action = 'CREATE';
      this.createForm();
    } else if (this.transferData.formType === Actions.Edit) {
      this.action = 'EDIT';
      this.retrieveData();
      this.createForm();
      this.populateEditForm();
    } else {
      console.error('Action type not defined. "Edit" or "Create" not found inside transfer object.');
    }
  }

  /**
   * Retrieves data from server passed in through the
   * transferData object, from the parent component.
   *
   * Used only for the 'EDIT' action.
   */
  private retrieveData(): void {
    this.data = this.transferData.data;
  }

  /**
   * Populates the blank Reactive Form with
   * data provided by the component's service.
   *
   * Called inside checkActionOnInit() on 'EDIT'.
   */
  private createForm(): void {
    this.competenceCentersForm = this.fb.group({
      id: [null],
      code: [null, [Validators.required, Validators.maxLength(3), Validators.pattern('^[a-zA-Z0-9]*$')]],
      city: [null, [Validators.required, Validators.maxLength(25)]],
      country: [null, [Validators.required, Validators.maxLength(25)]],
    });
  }

  /**
   * Populates the blank Reactive Form with
   * data provided by the component's service.
   *
   * Called inside checkActionOnInit() on 'EDIT'.
   */
  private populateEditForm(): void {
    this.competenceCentersForm.setValue({
      id: this.data.id,
      code: this.data.code,
      city: this.data.city,
      country: this.data.country,
    });
  }

}
