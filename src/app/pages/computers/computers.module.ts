import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ComputersRoutingModule } from './computers-routing.module';
import { ComputersContainerComponent } from './components/computers-container.component';
import { ComputersFormComponent } from './components/computers-form.component';

@NgModule({
  declarations: [ComputersContainerComponent, ComputersFormComponent],
  imports: [
    CommonModule,
    ComputersRoutingModule,
    ReactiveFormsModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
  ]
})
export class ComputersModule { }
