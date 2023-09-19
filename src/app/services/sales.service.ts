import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Sales } from '../models/sales';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SalesService {
    constructor(private http: HttpClient) {}
    private apiUrl = environment.API_URL;

    getSales(): Observable<Array<Sales>> {
        return this.http.post<Array<Sales>>(`${this.apiUrl}`, {
            getSales: true,
        });
    }
}
