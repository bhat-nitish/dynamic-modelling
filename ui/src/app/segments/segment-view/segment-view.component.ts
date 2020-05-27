import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig, FormlyAttributes, FormlyFormOptions, FormlyTemplateOptions } from '@ngx-formly/core';
import { ModellingService, SegmentService } from '../../services/index';
import { BaseModel, BaseModelParameter, Model, ModelParam, Segment, ServiceResponse, StepType } from '../../dto/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'segment-view',
    templateUrl: './segment-view.component.html',
    styleUrls: ['./segment-view.component.scss'],
})

export class SegmentViewComponent implements OnInit {

    @Input() _segment: Segment = new Segment();

    @Input() modelGroup: string = '';
    @Input() baseModels: Array<BaseModel> = new Array<BaseModel>();
    @Input() parentModelName: string = '';
    @Input() segmentName: string = '';
    @Input() segmentDescription: string = '';

    readonly oneGroup: string = "o";
    readonly nGroup: string = "n";
    readonly ensembleGroup = "e";

    isNStep = () => { return this.modelGroup == this.nGroup };
    isOneStep = () => { return this.modelGroup == this.oneGroup };
    isEnsemble = () => { return this.modelGroup == this.ensembleGroup };

    activeStep = 0;
    @Input() _steps: StepType[] = [];
    form = new FormArray(this._steps.map(() => new FormGroup({})));
    options = this._steps.map(() => <FormlyFormOptions>{});

    private routeSubscription: any;



    ngOnInit() {

    }

    @Input() set steps(value: StepType[]) {
        this._steps = value;
    }

    get steps() {
        return this._steps;
    }

    setSteps() {
        let firstStep = { fields: [], label: '', model: {} } as StepType;
        firstStep.fields.push(this.getModelNameField(), this.getBaseModelField(), ...this.getSelectedModelParamFields(this.baseModels[0]));
        this.steps = new Array<StepType>();
        this.steps.push(firstStep);
    }

    getBaseModelField(readonly: boolean = false) {
        return {
            key: 'baseModels',
            type: 'select',
            defaultValue: this.baseModels[0].id,
            templateOptions: {
                readonly: true,
                required: true,
                label: 'Model Type',
                placeholder: 'Please select a model type',
                valueProp: 'id',
                labelProp: 'displayName',
                options: this.baseModels,
                description: "Please select a Categorical or Continuous model type to train your model",
            }
        };
    }

    getModelNameField(readonly: boolean = false) {
        return {
            key: 'modelName',
            type: 'input',
            templateOptions: {
                readonly: true,
                required: true,
                label: 'Model Name',
                placeholder: 'Please select a model name',
                description: "Please select a unique model name for the segment"
            }
        };
    }

    getSelectedModelParamFields(model: BaseModel): Array<FormlyFieldConfig> {
        let fields: Array<FormlyFieldConfig> = new Array<FormlyFieldConfig>();
        if (model && model.parameters) {
            fields = model.parameters.map(param => this.mapModelParamToField(param))
        }
        return fields;
    }

    mapModelParamToField(param: BaseModelParameter): FormlyFieldConfig {
        let field: FormlyFieldConfig = { templateOptions: {} as FormlyTemplateOptions } as FormlyFieldConfig;
        field.key = param.parameterName;
        field.type = this.mapParamTypeToFieldType(param.parameterType);
        field.templateOptions.label = param.displayName;
        field.defaultValue = param.defaultValue;
        field.templateOptions.description = param.description;
        field.templateOptions.required = (param.maxValue != '' || param.minValue != '');
        field.templateOptions.readonly = true;
        return field;
    }

    mapParamMinValueToFieldValue(param: BaseModelParameter): number {
        if (param.parameterType === "Numeric" && param.minValue) {
            return parseInt(param.minValue, 10);
        } else if (param.parameterType === "Float" && param.minValue) {
            return parseFloat(param.minValue);
        }
        else {
            return null;
        }
    }

    getStepperHeaderClass() {
        return this.isOneStep() ? 'disable-header' : '';
    }

    ngOnChanges() {
    }

    mapParamTypeToFieldType = (paramType) => ({
        "Numeric": "input",
        "Float": "input",
        "Boolean": "checkbox",
        "List": "input",
        "String": "input"
    })[paramType];
}
