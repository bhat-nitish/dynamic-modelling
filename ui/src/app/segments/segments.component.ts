import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig, FormlyAttributes, FormlyFormOptions, FormlyTemplateOptions } from '@ngx-formly/core';
import { ModellingService, SegmentService } from '../services/index';
import { BaseModel, BaseModelParameter, Model, ModelParam, Segment, ServiceResponse, StepType } from '../dto/index';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
    selector: 'segments',
    templateUrl: './segments.component.html',
    styleUrls: ['./segments.component.scss'],
})

export class SegmentsComponent implements OnInit {

    readonly oneGroup: string = "o";
    readonly nGroup: string = "n";
    readonly ensembleGroup = "e";

    segments: Array<Segment> = new Array<Segment>();

    isNStep = () => { return this.modelGroup == this.nGroup };
    isOneStep = () => { return this.modelGroup == this.oneGroup };
    isEnsemble = () => { return this.modelGroup == this.ensembleGroup };

    modelGroup: string = '';
    baseModels: Array<BaseModel> = new Array<BaseModel>();
    activeStep = 0;
    ready: boolean = false;
    steps: StepType[] = [];
    form = new FormArray(this.steps.map(() => new FormGroup({})));
    options = this.steps.map(() => <FormlyFormOptions>{});
    segmentName: string = '';
    segmentDescription: string = '';
    categories = [];
    segment: Segment = new Segment();
    parentModelName: string = '';
    segmentAdd: boolean = false;
    segmentView: boolean = false;
    private routeSubscription: any;


    constructor(private route: ActivatedRoute, private router: Router, private modellingService: ModellingService, private segmentService: SegmentService, private _snackBar: MatSnackBar) {
        this.categories.push({ name: 'Linear regression', models: [{ id: 1, name: "Model 1" }] });
    }

    async ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(async params => {
            let id = +params['id'];

            await this.setModelsAndSegments();

            if (id > 0) {
                this.setSegmentView(true);
                this.mapSegmentForView(id);
            } else {
                this.setSegmentAdd(true);
                this.setSteps();
            }
        });
    }

    async setModelsAndSegments() {
        if (this.baseModels.length == 0) {
            await this.setBaseModels();
        }
        if (this.segments.length == 0) {
            await this.setSegments();
        }

    }

    async setBaseModels(): Promise<boolean> {
        return Promise.resolve((async () => {
            let modelsFetched = this.modellingService.getBaseModels();
            let models = await modelsFetched.toPromise();
            await this.mapBaseModels(models)
            return true;
        })());
    }

    async setSegments(): Promise<boolean> {
        return Promise.resolve((async () => {
            let segmentsFetched = this.segmentService.getSegments();
            this.segments = await segmentsFetched.toPromise();
            return true;
        })());
    }

    filterStates(term: any) {
        if (term && term.displayName) {
            return this.baseModels.filter(state => state.displayName.toLowerCase().indexOf(term.displayName.toLowerCase()) >= 0);
        } else if (term) {
            return this.baseModels.filter(state => state.displayName.toLowerCase().indexOf(term.toLowerCase()) >= 0);
        }
    }

    setSteps() {
        let firstStep = { fields: [], label: '', model: {} } as StepType;
        firstStep.fields.push(this.getModelNameField(), this.getBaseModelField(), ...this.getSelectedModelParamFields(this.baseModels[0]));
        this.steps = new Array<StepType>();
        this.steps.push(firstStep);
        this.reInitializeForm();
    }

    resetSteps() {
        this.segment = new Segment();
        let firstStep = { fields: [], label: '', model: {} } as StepType;
        firstStep.fields.push(this.getModelNameField(), this.getBaseModelField(), ...this.getSelectedModelParamFields(this.baseModels[0]));
        this.segmentName = '';
        this.segmentDescription = '';
        this.parentModelName = '';
        this.modelGroup = '';
        this.steps = new Array<StepType>();
        this.steps.push(firstStep);
        this.reInitializeForm();
    }

    getBaseModelField(readonly: boolean = false) {
        return {
            key: 'baseModels',
            type: 'select',
            defaultValue: this.baseModels[0].id,
            templateOptions: {
                readonly: readonly,
                required: true,
                label: 'Model Type',
                placeholder: 'Please select a model type',
                valueProp: 'id',
                labelProp: 'displayName',
                options: this.baseModels,
                description: "Please select a Categorical or Continuous model type to train your model",
                change: (field, event) => this.onModelTypeChanged(field, event),
            }
        };
    }

    getModelNameField(readonly: boolean = false) {
        return {
            key: 'modelName',
            type: 'input',
            templateOptions: {
                readonly: readonly,
                required: true,
                label: 'Model Name',
                placeholder: 'Please select a model name',
                description: "Please select a unique model name for the segment"
            },
            validators: {
                modelName: {
                    expression: (c, event) => this.duplicateModelNameValidator(c, event),
                    message: (error, field: FormlyFieldConfig) => `The model name should be unique in a segment`,
                },
            },
        };
    }

    duplicateModelNameValidator(control: FormControl, event: any): boolean {
        if (!control.value)
            return true;
        return this.steps.filter((x, index) => index != this.activeStep && x.model['modelName'] == control.value).length === 0;
    }

    reInitializeForm() {
        this.form = new FormArray(this.steps.map(() => new FormGroup({})));
        this.options = this.steps.map(() => <FormlyFormOptions>{});
    }

    onModelTypeChanged(field: BaseModel, event: any) {

        let activeStep = this.steps[this.activeStep];
        activeStep.model = { baseModels: event.value, modelName: (activeStep.model as any).modelName };
        activeStep.fields = [activeStep.fields.find(f => f.key === 'modelName'), activeStep.fields.find(f => f.key === 'baseModels')];
        let selectedModel: BaseModel = this.baseModels.find(f => f.id == event.value);
        activeStep.fields.push(...this.getSelectedModelParamFields(selectedModel));
        this.reInitializeForm();
    }

    getSelectedModelParamFields(model: BaseModel): Array<FormlyFieldConfig> {
        let fields: Array<FormlyFieldConfig> = new Array<FormlyFieldConfig>();
        if (model && model.parameters) {
            fields = model.parameters.map(param => this.mapModelParamToField(param))
        }
        return fields;
    }

    mapModelParamToField(param: BaseModelParameter, readonly: boolean = false): FormlyFieldConfig {
        let field: FormlyFieldConfig = { templateOptions: {} as FormlyTemplateOptions } as FormlyFieldConfig;
        field.key = param.parameterName;
        field.type = this.mapParamTypeToFieldType(param.parameterType);
        field.templateOptions.label = param.displayName;
        field.templateOptions.type = this.mapParamTypeToFieldDataType(param.parameterType);
        field.templateOptions.max = this.mapParamMaxValueToFieldMaxValue(param);
        field.templateOptions.min = this.mapParamMinValueToFieldValue(param);
        field.defaultValue = param.defaultValue;
        field.templateOptions.step = this.mapParamDatatypeToFieldStep(param);
        field.templateOptions.description = param.description;
        field.templateOptions.required = (param.maxValue != '' || param.minValue != '');
        field.templateOptions.readonly = readonly;
        return field;
    }

    mapParamDatatypeToFieldStep(param: BaseModelParameter): any {
        if (param.parameterType === "Numeric") {
            return 1;
        } else if (param.parameterType === "Float") {
            return 0.1;
        }
        else {
            return null;
        }
    }

    mapParamMaxValueToFieldMaxValue(param: BaseModelParameter): number {
        if (param.parameterType === "Numeric" && param.maxValue) {
            return parseInt(param.maxValue, 10);
        } else if (param.parameterType === "Float" && param.maxValue) {
            return parseFloat(param.maxValue);
        }
        else {
            return null;
        }
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

    mapParamTypeToFieldType = (paramType) => ({
        "Numeric": "input",
        "Float": "input",
        "Boolean": "checkbox",
        "List": "input",
        "String": "input"
    })[paramType];

    mapParamTypeToFieldDataType = (paramType) => ({
        "Numeric": "number",
        "Float": "number",
        "List": "chips",
        "String": "string"
    })[paramType];

    async mapBaseModels(models: Array<BaseModel>): Promise<boolean> {
        return Promise.resolve((() => {
            this.baseModels = models;
            this.ready = true;
            return true;
        })());
    }

    prevStep(step) {
        this.activeStep = step - 1;
    }

    nextStep(step) {
        this.activeStep = step + 1;
    }

    getBaseModelFieldForView(id: number) {
        return {
            key: 'baseModels',
            type: 'select',
            templateOptions: {
                readonly: true,
                required: true,
                label: 'Model Type',
                placeholder: 'Please select a model type',
                valueProp: 'id',
                labelProp: 'displayName',
                options: this.baseModels.filter(b => b.id == id),
                description: "Please select a Categorical or Continuous model type to train your model",
            }
        };
    }

    getModelNameFieldForView() {
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

    mapSegmentForView(id: number) {
        let viewSegment: Segment = new Segment();
        let SegmentName: string = ''
        let SegmentDescrition: string = '';
        let mdlGroup = '';

        viewSegment = this.segments.find(s => s.id == id);
        SegmentName = viewSegment.name;
        SegmentDescrition = viewSegment.description;
        mdlGroup = viewSegment.modelType;
        let models = new Array<Model>();
        if (mdlGroup === this.nGroup) {
            this.parentModelName = viewSegment.models[0].name;
            models = viewSegment.models[0].models;
        } else {
            models = viewSegment.models;
        }
        this.mapSegmentModelsToSteps(models);
        this.segment = viewSegment;
        this.segmentName = SegmentName
        this.segmentDescription = SegmentDescrition;
        this.modelGroup = mdlGroup;
        this.segment = viewSegment;
        this.steps = [...this.steps];
    }

    mapSegmentModelsToSteps(models: Array<Model>) {
        this.steps = new Array<StepType>();
        models.forEach(model => {
            this.mapModelParamsToStepFields(model);
        });
        this.reInitializeForm();
    }

    mapModelParamsToStepFields(model: Model) {
        let step = { fields: [], label: '', model: {} } as StepType;
        step.model['baseModels'] = model.baseModel.id;
        step.model['modelName'] = model.name;
        step.fields.push(this.getModelNameFieldForView(), this.getBaseModelFieldForView(model.baseModel.id));
        model.parameters.forEach(param => {
            let baseModelParam = this.baseModels.find(m => m.id == param.baseModelId).parameters.find(p => p.id == param.baseModelParamId);
            step.fields.push(this.mapModelParamToField(baseModelParam, true));
            step.model[baseModelParam.parameterName] = param.value;
        });
        this.steps.push(step);
    }

    setSegmentView(state: boolean) {
        this.segmentView = state;

    }

    setSegmentAdd(state: boolean) {
        this.segmentAdd = state;
    }

    removeStep(i) {
        this.steps.splice(i, 1);
    }

    getStepperHeaderClass() {
        return this.isOneStep() ? 'disable-header' : '';
    }

    addModel() {
        let step = { fields: [], label: '', model: {} } as StepType;
        step.fields.push(this.getModelNameField(), this.getBaseModelField(), ...this.getSelectedModelParamFields(this.baseModels[0]));
        this.steps.push(step);
        this.reInitializeForm();
    }

    onStepChange(event: any): void {
        this.activeStep = event.selectedIndex;
    }

    modelTypeChanged() {
        this.parentModelName = '';
        this.setSteps();
        this.reInitializeForm();
    }

    async saveSegment() {

        this.segment.name = this.segmentName;
        this.segment.description = this.segmentDescription;
        this.segment.modelType = this.modelGroup;

        let models: Array<Model> = this.steps.map((step) => ({
            baseModel: this.baseModels.find(b => b.id == (step.model as any).baseModels),
            name: (step.model as any).modelName,
            parameters: this.baseModels.
                find(b => b.id == (step.model as any).baseModels).
                parameters.map((param) => ({
                    baseModelId: (step.model as any).baseModels,
                    baseModelParamId: param.id,
                    value: step.model[param.parameterName].toString()
                }) as ModelParam)
        }) as Model);
        if (this.isNStep()) {
            let parentModel: Model = new Model();
            parentModel.models = models;
            parentModel.name = this.parentModelName;
            this.segment.models = [parentModel];
        } else {
            this.segment.models = models;
        }
        this.ready = false;
        let response = await this.createSegment(this.segment);

        if (response.success) {
            this.addSegmentToList(response.id, this.segment);
            this.resetSteps();
            this.ready = true;
            this.displayMessage(response.message, "Success");
        } else {
            this.ready = true;
            this.displayMessage(response.message, "Error");
        }
    }

    addSegmentToList(id: number, segment: Segment) {
        segment.id = id;
        this.segments = [...this.segments, segment];
    }

    async createSegment(segment: Segment): Promise<ServiceResponse> {
        return Promise.resolve((async () => {
            let segmentAdded = this.segmentService.addSegment(segment);
            let response = await segmentAdded.toPromise();
            return response;
        })());
    }

    displayMessage(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }

}