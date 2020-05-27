import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseModel, BaseModelParameter } from '../dto/index'
import { BaseService } from './base.service';
import { ApiEndpoint } from './api.endpoint';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ModellingService extends BaseService<BaseModel> {

    constructor(httpClient: HttpClient, apiEndpoint: ApiEndpoint) {
        super(
            httpClient, apiEndpoint);
    }

    getBaseModels(): Observable<Array<BaseModel>> {
        return this.getAll("basemodels");
    }

}