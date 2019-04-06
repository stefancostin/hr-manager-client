import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsContainerComponent } from './components/teams-container.component';
import { TeamsFormComponent } from './components/teams-form.component';

@NgModule({
  declarations: [TeamsContainerComponent, TeamsFormComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    ReactiveFormsModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
  ]
})
export class TeamsModule { }
