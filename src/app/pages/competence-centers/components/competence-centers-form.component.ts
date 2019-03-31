import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    } else {
      console.error('Action type not defined. "Edit" or "Create" not found inside transfer object.');
    }
  }

  /**
   * Creates a blank Reactive Form with validation
   * used for the 'CREATE' action.
   *
   * Called inside the checkActionOnInit() method
   * based on the action type of the component.
   */
  private createForm(): void {
    this.competenceCentersForm = this.fb.group({
      code: null,
      city: null,
      country: null,
    });
  }

}
