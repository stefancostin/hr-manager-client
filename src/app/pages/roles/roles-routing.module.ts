import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesContainerComponent } from './components/roles-container.component';

const routes: Routes = [
  { path: '', component: RolesContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
