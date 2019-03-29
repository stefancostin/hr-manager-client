import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbMomentDateModule } from '@nebular/moment';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './components/employees.component';

@NgModule({
  declarations: [
    EmployeesComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
  ]
})
export class EmployeesModule { }
