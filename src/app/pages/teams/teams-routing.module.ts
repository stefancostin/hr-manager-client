import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsContainerComponent } from './components/teams-container.component';

const routes: Routes = [
  { path: '', component: TeamsContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
