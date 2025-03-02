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

    getEmployers(): Observable<Array<Employers>> {
        return this.http.post<Array<Employers>>(`${this.apiURL}`, {
            getEmployers: true,
        });
    }

    postNewEmployer(data: Employers): Observable<Employers> {
        return this.http.post<Employers>(`${this.apiURL}`, {
            postEmployer: true,
            login: data.login,
            password: data.password,
            email: data.email,
            position: data.position,
        });
    }

    employerLogin(data: Employers): Observable<Array<Employers>> {
        return this.http.post<Array<Employers>>(`${this.apiURL}`, {
            empLog: true,
            employerLogin: data.login,
            employerPassword: data.password,
        });
    }

    employerLogout(data: Employers): Observable<boolean> {
        return this.http.post<boolean>(`${this.apiURL}`, {
            empLogout: true,
            login: data.login,
        });
    }

    deleteEmployer(data: Employers): Observable<Employers> {
        return this.http.post<Employers>(`${this.apiURL}`, {
            deleteEmployer: true,
            id: data.id,
        });
    }
}
