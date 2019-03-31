import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetenceCentersContainerComponent } from './components/competence-centers-container.component';

const routes: Routes = [
  { path: '', component: CompetenceCentersContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetenceCentersRoutingModule { }
