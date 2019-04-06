import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputersContainerComponent } from './components/computers-container.component';

const routes: Routes = [
  { path: '', component: ComputersContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputersRoutingModule { }
