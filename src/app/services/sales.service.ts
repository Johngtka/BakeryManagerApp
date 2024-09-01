import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Sales } from '../models/sales';
import { environment } from 'src/environments/environment';
import { SalesProductsList } from '../models/sales-products-list';

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

    getListOfProducts(): Observable<Array<SalesProductsList>> {
        return this.http.post<Array<SalesProductsList>>(`${this.apiUrl}`, {
            getListOfProducts: true,
        });
    }

    postSale(data: Sales): Observable<Sales> {
        return this.http.post<Sales>(`${this.apiUrl}`, {
            postSale: true,
            name: data.productName,
            sDate: data.startDate,
            eDate: data.endDate,
            sCode: data.saleCode,
            value: data.value,
        });
    }

    deleteSale(data: Sales): Observable<Sales> {
        return this.http.post<Sales>(`${this.apiUrl}`, {
            deleteSale: true,
            id: data.id,
        });
    }
}
