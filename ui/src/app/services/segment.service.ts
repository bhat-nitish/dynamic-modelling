import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseModel, Segment, ServiceResponse } from '../dto/index'
import { BaseService } from './base.service';
import { ApiEndpoint } from './api.endpoint';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SegmentService extends BaseService<Segment> {

    constructor(httpClient: HttpClient, apiEndpoint: ApiEndpoint) {
        super(
            httpClient, apiEndpoint);
    }

    getSegments(): Observable<Array<Segment>> {
        return this.getAll("segments");
    }

    addSegment(segment: Segment): Observable<ServiceResponse> {
        return this.create("segments", segment);
    }

}