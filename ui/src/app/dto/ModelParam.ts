export class ModelParam {
    id: number;
    baseModelParamId: number;
    baseModelId: number;
    value: string;

    initalize(id: number, baseModelParamId: number, baseModelId: number, value: string) {
        this.id = id;
        this.baseModelParamId = baseModelParamId;
        this.baseModelId = baseModelId;
        this.value = value;
    }
}