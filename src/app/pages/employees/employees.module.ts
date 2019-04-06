import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesContainerComponent } from './components/employees-container.component';
import { EmployeesFormComponent } from './components/employees-form.component';

@NgModule({
  declarations: [
    EmployeesContainerComponent,
    EmployeesFormComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
  ]
})
export class EmployeesModule { }
