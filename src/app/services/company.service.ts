import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Company } from '../models/company';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.API_URL;

    getCompany(): Observable<Array<Company>> {
        return this.http.post<Array<Company>>(`${this.apiUrl}`, {
            getCompany: true,
        });
    }
}
