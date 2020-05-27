import { BaseModelParameter } from './BaseModelParameter';

export class BaseModel {
    id: number;
    modelType: string;
    functionName: string;
    path: string;
    y_var_type: string;
    displayName: string;
    parameters: Array<BaseModelParameter>;

    initialize(id: number, modelType: string, functionName: string, path: string, y_var_type: string,
        displayName: string, parameters: Array<BaseModelParameter>) {
        this.id = id;
        this.modelType = modelType;
        this.functionName = functionName;
        this.path = path;
        this.y_var_type = y_var_type;
        this.displayName = displayName;
        this.parameters = parameters;
    }
}