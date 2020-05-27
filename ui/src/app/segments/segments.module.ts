import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentsComponent } from './segments.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatStepperModule } from '@angular/material/stepper';
import { TreeDynamicExample } from './segment-list/segment-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SegmentViewComponent } from './segment-view/segment-view.component';

@NgModule({
  declarations: [SegmentsComponent, TreeDynamicExample, SegmentViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatStepperModule
  ]
})

export class SegmentsModule { }
