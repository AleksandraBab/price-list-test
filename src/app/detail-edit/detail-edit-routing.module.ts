import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailEditComponent } from './detail-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DetailEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailEditRoutingModule { }
