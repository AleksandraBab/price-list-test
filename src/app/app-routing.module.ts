import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { PriceListComponent } from './price-list/price-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: PriceListComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./detail-edit/detail-edit.module').then(m => m.DetailEditModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
