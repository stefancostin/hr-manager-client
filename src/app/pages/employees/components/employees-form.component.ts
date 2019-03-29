import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hr-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit {
  @Output() leave = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openTableView(): void {
    this.leave.emit();
  }

}
