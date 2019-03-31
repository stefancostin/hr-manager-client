import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsContainerComponent } from './components/incidents-container.component';
import { IncidentsFormComponent } from './components/incidents-form.component';

@NgModule({
  declarations: [IncidentsContainerComponent, IncidentsFormComponent],
  imports: [
    CommonModule,
    IncidentsRoutingModule,
    ReactiveFormsModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
  ]
})
export class IncidentsModule { }
