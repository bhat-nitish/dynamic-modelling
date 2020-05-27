
import { FormlyFieldConfig } from '@ngx-formly/core';

export interface StepType {
    label: string;
    modelName: string;
    fields: FormlyFieldConfig[];
    model: {};
}