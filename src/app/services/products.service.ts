import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    private apiURL = environment.API_URL;

    getProducts(): Observable<Array<Product>> {
        return this.http.post<Array<Product>>(`${this.apiURL}`, {
            getProducts: true,
        });
    }

    postProduct(data: Product): Observable<Product> {
        return this.http.post<Product>(`${this.apiURL}`, {
            postProduct: true,
            id: data.id,
            name: data.name,
            price: data.price,
            weight: data.weight,
            components: data.components,
            description: data.description,
        });
    }

    editProduct(data: Product): Observable<Product> {
        return this.http.post<Product>(`${this.apiURL}`, {
            editProduct: true,
            id: data.id,
            name: data.name,
            price: data.price,
            weight: data.weight,
            components: data.components,
            description: data.description,
        });
    }

    deleteProduct(data: Product): Observable<Product> {
        return this.http.post<Product>(`${this.apiURL}`, {
            deleteProduct: true,
            id: data.id,
        });
    }
}
