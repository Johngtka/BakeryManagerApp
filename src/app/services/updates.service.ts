import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Update } from '../models/update';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UpdatesService {
    constructor(private http: HttpClient) {}
    private apiURL = environment.API_URL;

    getUpdates(): Observable<Array<Update>> {
        return this.http.post<Array<Update>>(`${this.apiURL}`, {
            getUpdates: true,
        });
    }

    postUpdate(data: Update): Observable<Update> {
        return this.http.post<Update>(`${this.apiURL}`, {
            postUpdate: true,
            name: data.name,
            date: data.date,
            desc: data.description,
        });
    }

    editUpdate(data: Update): Observable<Update> {
        return this.http.post<Update>(`${this.apiURL}`, {
            editUpdate: true,
            name: data.name,
            date: data.date,
            desc: data.description,
            id: data.id,
        });
    }
}
