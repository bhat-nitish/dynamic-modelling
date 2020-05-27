import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiEndpoint } from './api.endpoint';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ServiceResponse } from '../dto/index'

// Base Service which provides generic http capabilities 

export class BaseService<T> {

    constructor(
        private http: HttpClient,
        private apiEndpoint: ApiEndpoint
    ) { }

    public create(endpoint: string, item: T): Observable<ServiceResponse> {
        let header = new HttpHeaders();
        header= header.append('content-type', 'application/json');
        return this.http.post<ServiceResponse>(this.apiEndpoint.generateUrl(endpoint), item,{headers:header});
    }

    public update(endpoint: string, item: T): Observable<T> {
        return this.http.put<T>(this.apiEndpoint.generateUrl(endpoint), item);
    }

    getById(endpoint: string, id: number): Observable<T> {
        return this.http.get<T>(this.apiEndpoint.generateUrl(endpoint), {});
    }

    getAll(endpoint: string): Observable<T[]> {
        return this.http.get<T[]>(this.apiEndpoint.generateUrl(endpoint));
    }

    deleteById(endpoint: string, id: number) {
        return this.http.delete(this.apiEndpoint.generateUrl(endpoint));
    }
}