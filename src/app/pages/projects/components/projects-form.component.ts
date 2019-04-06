import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IProject, TransferObject } from '../project.model';
import { ProjectService } from '../services/project.service';
import { Actions } from '../../shared/actions.enum';

@Component({
  selector: 'hr-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.scss']
})
export class ProjectsFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;
  public projectsForm: FormGroup;
  public data: IProject;

  public constructor(private fb: FormBuilder, private projectService: ProjectService) { }

  public ngOnInit(): void {
    // console.log(this.transferData);
    this.checkActionOnInit();
  }

  /**
   * Creates a new entity of the Project type.
   * Event: Binds to the ADD PROJECT button.
   */
  public createEntity() {

  }

  /**
   * Edits the current entity of type Project.
   * Event: Binds to the EDIT PROJECT button.
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
   * Creates a blank Reactive Form with validation
   * used for the 'CREATE' and 'EDIT' action.
   *
   * Called inside the checkActionOnInit() method.
   */
  private createForm(): void {
    this.projectsForm = this.fb.group({
      id: [null],
      code: [null, [Validators.required, Validators.maxLength(3), Validators.pattern('^[a-zA-Z0-9]*$')]],
      name: [null, [Validators.required, Validators.maxLength(25)]],
      team_id: [null, [Validators.required]]
    });
  }

  /**
   * Populates the blank Reactive Form with
   * data provided by the component's service.
   *
   * Called inside checkActionOnInit() on 'EDIT'.
   */
  private populateEditForm(): void {
    this.projectsForm.setValue({
      id: this.data.id,
      code: this.data.code,
      name: this.data.name,
      team_id: this.data.team_id
    });
  }

}
