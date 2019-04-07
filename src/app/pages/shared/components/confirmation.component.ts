import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'hr-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<ConfirmationComponent>) { }

  ngOnInit() {
  }

  delete() {

  }

}
