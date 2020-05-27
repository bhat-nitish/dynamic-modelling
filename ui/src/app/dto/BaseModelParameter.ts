export class BaseModelParameter {
    id: number;
    modelId: number;
    parameterName: string;
    displayName: string;
    minValue: string;
    maxValue: string;
    defaultValue: string;
    parameterType: string;
    description: string;

    initialize(id: number, modelId: number, parameterName: string, displayName: string, minValue: string,
        maxValue: string, defaultValue: string, parameterType: string, description: string) {
        this.id = id;
        this.modelId = modelId;
        this.parameterName = parameterName;
        this.displayName = displayName;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.defaultValue = defaultValue;
        this.parameterType = parameterType;
        this.description = description;
    }
}