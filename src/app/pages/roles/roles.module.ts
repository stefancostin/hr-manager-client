import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesContainerComponent } from './components/roles-container.component';
import { RolesFormComponent } from './components/roles-form.component';

@NgModule({
  declarations: [RolesContainerComponent, RolesFormComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
  ]
})
export class RolesModule { }
