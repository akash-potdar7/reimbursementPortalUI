import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RformRecordsComponent } from '../rform-records/rform-records.component';
import { RouterModule, Routes } from '@angular/router';
import { RformComponent } from '../rform/rform.component';

const routes: Routes = [
  { path: 'rform', component: RformComponent },
  { path: 'viewSubmitted', component: RformRecordsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
  constructor() {}
}
