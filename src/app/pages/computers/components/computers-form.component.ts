import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../shared/services/notification.service';
import { ComputerService } from '../services/computer.service';
import { IComputer, TransferObject } from '../computer.model';
import { Actions } from '../../shared/actions.enum';

import { EmployeeService } from '../../employees/services/employee.service';
import { IEmployee, Employee } from '../../employees/employee.model';


@Component({
  selector: 'hr-computers-form',
  templateUrl: './computers-form.component.html',
  styleUrls: ['./computers-form.component.scss']
})
export class ComputersFormComponent implements OnInit {
  @Output() leave = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Input() transferData: TransferObject;
  public action: string;
  public computersForm: FormGroup;
  public data: IComputer;
  public employees: IEmployee[];
  public currentEmployee: IEmployee;

  public constructor(
    private fb: FormBuilder,
    private computerService: ComputerService,
    private employeeService: EmployeeService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
    ) { }

  public ngOnInit(): void {
    this.checkActionOnInit();
    this.getEmployees();
    this.cdr.detectChanges();
  }

  /**
   * Creates a new entity of the Computer type.
   * Event: Binds to the ADD COMPUTER button.
   */
  public createEntity(): void {
    this.computerService.addComputer(this.computersForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'computer', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'computer', this.transferData.formType, 0, message);
    });
  }

  /**
   * Edits the current entity of type Computer.
   * Event: Binds to the EDIT COMPUTER button.
   */
  public editEntity(): void {
    this.computerService.updateComputer(this.computersForm.value).subscribe(resp => {
      this.updateDataSource();
      this.notificationService.showToast('success', 'computer', this.transferData.formType, 3000);
      this.openTableView();
    }, err => {
      const message: string = this.notificationService.showErrorMessage(err.error.message, err.error.errors);
      this.notificationService.showToast('danger', 'computer', this.transferData.formType, 0, message);
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
   * Receives list from the server (index).
   */
  private getEmployees(): void {
    this.currentEmployee = new Employee();

    this.employeeService.getEmployeesWithoutComputer().subscribe(resp => {
      this.employees = resp.data;

      // On Edit
      if (this.transferData.formType === Actions.Edit) {
        this.findCurrentEmployee();
      }
    });
  }

  /**
   * Iterates through the list received from the server
   * to find what the current selected entity is.
   */
  private findCurrentEmployee(): void {
    setTimeout(() => {
      this.currentEmployee = new Employee();
      this.currentEmployee.id = this.data.employee_id;
    });
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
   * Creates a blank Reactive Form with validation
   * used for the 'CREATE' and 'EDIT' action.
   *
   * Called inside the checkActionOnInit() method.
   */
  private createForm(): void {
    this.computersForm = this.fb.group({
      id: [null],
      code: [null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9]*$')]],
      employee_id: [null, [Validators.required]],
      operating_system: [null, [Validators.required, Validators.maxLength(25)]],
      cpu: [null, [Validators.required, Validators.maxLength(6)]],
      ram: [null, [Validators.required, Validators.maxLength(6)]],
      hdd: [null, [Validators.required, Validators.maxLength(6)]],
    });
  }

  /**
   * Populates the blank Reactive Form with
   * data provided by the component's service.
   *
   * Called inside checkActionOnInit() on 'EDIT'.
   */
  private populateEditForm(): void {
    this.computersForm.setValue({
      id: this.data.id,
      code: this.data.code,
      employee_id: this.data.employee_id,
      operating_system: this.data.operating_system,
      cpu: this.data.cpu,
      ram: this.data.ram,
      hdd: this.data.hdd
    });
  }

}
