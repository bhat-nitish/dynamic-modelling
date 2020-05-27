import { BaseModel } from './BaseModel';
import { ModelParam } from './ModelParam';


export class Model {
    id: number;
    name: string;
    baseModel: BaseModel;
    parameters: Array<ModelParam>;

    models: Array<Model>;

    initalize(id: number, name: string, baseModel: BaseModel, parameters: Array<ModelParam>) {
        this.id = id;
        this.name = name;
        this.baseModel = baseModel;
        this.parameters = parameters;
    }
}