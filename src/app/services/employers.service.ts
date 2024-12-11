import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Employers } from '../models/employers';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EmployersService {
    constructor(private http: HttpClient) {}

    private apiURL = environment.API_URL;

    employerLogout(data: Employers): Observable<boolean> {
        return this.http.post<boolean>(`${this.apiURL}`, {
            empLogout: true,
            login: data.login,
        });
    }

    employerLogin(data: Employers): Observable<Array<Employers>> {
        return this.http.post<Array<Employers>>(`${this.apiURL}`, {
            empLog: true,
            employerLogin: data.login,
            employerPassword: data.password,
        });
    }
}
