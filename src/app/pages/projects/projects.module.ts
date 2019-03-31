import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsContainerComponent } from './components/projects-container.component';
import { ProjectsFormComponent } from './components/projects-form.component';

@NgModule({
  declarations: [ProjectsContainerComponent, ProjectsFormComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
  ]
})
export class ProjectsModule { }
