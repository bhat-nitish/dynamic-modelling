import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { SegmentsModule } from './segments/segments.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { HttpClientModule } from '@angular/common/http';
import { ModellingServices } from './services/services.module';
import { FormlyAutocompleteTypeComponent } from './custom-components/index';
import { HeaderComponent } from './custom-components/header/header.component';
import { LeftMenuComponent } from './custom-components/left-menu/left-menu.component';
import { TreeDynamicExample } from '../app/segments/segment-list/segment-list.component'

@NgModule({
  declarations: [
    AppComponent,
    FormlyAutocompleteTypeComponent,
    HeaderComponent,
    LeftMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [{
        name: 'autocomplete',
        component: FormlyAutocompleteTypeComponent,
        wrappers: ['form-field'],
      }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyMaterialModule,
    SegmentsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [ModellingServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
