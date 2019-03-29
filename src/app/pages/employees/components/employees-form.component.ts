import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEmployee, TransferObject, Actions } from '../employee.model';

@Component({
  selector: 'hr-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Input() transferData: any;
  // @Input() transferData: TransferObject;
  public action: string;

  constructor() { }

  ngOnInit() {
    // console.log(this.transferData);
    this.checkAction();
  }

  checkAction() {
    if (this.transferData.formType === Actions.Create) {
      this.action = 'CREATE';
    } else if (this.transferData.formType === Actions.Edit) {
      this.action = 'EDIT';
    } else {
      console.error('Action type not defined. Did you mean "Edit" or "Create"?');
    }
  }

  openTableView(): void {
    this.leave.emit();
  }

}
