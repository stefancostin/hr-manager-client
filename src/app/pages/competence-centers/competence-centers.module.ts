import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CompetenceCentersRoutingModule } from './competence-centers-routing.module';
import { CompetenceCentersContainerComponent } from './components/competence-centers-container.component';
import { CompetenceCentersFormComponent } from './components/competence-centers-form.component';

@NgModule({
  declarations: [CompetenceCentersContainerComponent, CompetenceCentersFormComponent],
  imports: [
    CommonModule,
    CompetenceCentersRoutingModule,
    ReactiveFormsModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
  ]
})
export class CompetenceCentersModule { }
