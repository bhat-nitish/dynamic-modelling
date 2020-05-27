import { Model } from './Model';

export class Segment {
    id: number;
    name: string;
    modelType: string;
    description: string;
    models: Array<Model>;

    constructor() {
        this.name = '';
        this.modelType = '';
        this.description = '';
        this.models = new Array<Model>();
    }

    initalize(id: number, name: string, modelType: string, description: string, models: Array<Model>) {
        this.id = id;
        this.name = name;
        this.modelType = modelType;
        this.description = description;
        this.models = models;
    }
}