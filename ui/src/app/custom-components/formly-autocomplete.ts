import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
    selector: 'formly-autocomplete-type',
    template: `
    <input matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder">
    <mat-autocomplete  #auto="matAutocomplete"  [displayWith]="getDisplayFn()">
    <mat-option *ngFor="let value of filter | async" [value]="value">
        {{ value.displayName }}
      </mat-option>
    </mat-autocomplete>
  `,
})
export class FormlyAutocompleteTypeComponent extends FieldType implements OnInit {
    @ViewChild(MatInput, { static: false }) formFieldControl: MatInput;
    @Output() optionSelected = new EventEmitter();

    filter: Observable<any[]>;

    ngOnInit() {
        super.ngOnInit();
        this.filter = (this.formControl.valueChanges as any)
            .pipe(
                startWith(''),
                switchMap(term => this.to.filter(term))
            );
    }

    public getDisplayFn() {
        return (val) => this.display(val);
    }

    private display(item): string {
        //access component "this" here
        return item ? item.displayName : item;
    }

}
