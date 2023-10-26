import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.API_URL;

    getUsers(): Observable<Array<User>> {
        return this.http.get<Array<User>>(`${this.apiUrl}`);
    }

    getUserOrders(data: User): Observable<Array<Order>> {
        return this.http.post<Array<Order>>(`${this.apiUrl}`, {
            usersOrders: true,
            login: data.login,
        });
    }
}
