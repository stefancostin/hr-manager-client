import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ITeam, TransferObject } from '../team.model';
import { TeamService } from '../services/team.service';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-teams-form',
  templateUrl: './teams-form.component.html',
  styleUrls: ['./teams-form.component.scss']
})
export class TeamsFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;
  public teamsForm: FormGroup;

  public constructor(private fb: FormBuilder, private teamService: TeamService) { }

  public ngOnInit(): void {
    // console.log(this.transferData);
    this.checkActionOnInit();
  }

  /**
   * Creates a new entity of the Team type.
   * Event: Binds to the ADD TEAM button.
   */
  public createEntity() {

  }

  /**
   * Edits the current entity of type Team.
   * Event: Binds to the EDIT TEAM button.
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
    this.teamsForm = this.fb.group({
      code: null,
      name: null,
      competence_center_id: null,
    });
  }

}
