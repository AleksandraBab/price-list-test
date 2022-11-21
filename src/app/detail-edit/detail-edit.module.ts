import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailEditComponent } from './detail-edit.component';
import { DetailEditRoutingModule } from './detail-edit-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DetailEditComponent,
  ],
  imports: [
    CommonModule,
    DetailEditRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class DetailEditModule { }
