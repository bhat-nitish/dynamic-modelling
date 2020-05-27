import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SegmentsComponent } from './segments/segments.component'

const routes: Routes = [
  { path: 'segments', component: SegmentsComponent },
  { path: 'segments/:id', component: SegmentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
