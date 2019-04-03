import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ICompetenceCenter, TransferObject } from '../competence-center.model';
import { CompetenceCenterService } from '../services/competence-center.service';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-competence-centers-form',
  templateUrl: './competence-centers-form.component.html',
  styleUrls: ['./competence-centers-form.component.scss']
})
export class CompetenceCentersFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;
  public competenceCentersForm: FormGroup;
  public data: ICompetenceCenter;

  public constructor(private fb: FormBuilder, private competenceCenterService: CompetenceCenterService) { }

  public ngOnInit(): void {
    // console.log(this.transferData);
    this.checkActionOnInit();
  }

  /**
   * Creates a new entity of the Competence Center type.
   * Event: Binds to the ADD COMPETENCE CENTER button.
   */
  public createEntity() {

  }

  /**
   * Edits the current entity of type Competence Center.
   * Event: Binds to the EDIT COMPETENCE CENTER button.
   */
  public editEntity() {

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
      this.createForm();
      this.populateEditForm();
    } else {
      console.error('Action type not defined. "Edit" or "Create" not found inside transfer object.');
    }
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
