import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
    constructor(
        private productService: ProductsService,
        private snackService: SnackService,
    ) {}

    product!: Product[];
    logID: number[] = [];
    dataSource!: MatTableDataSource<Product>;
    loadingProcess: boolean = true;
    isSelected: boolean = false;
    displayedColumns: string[] = [
        'name',
        'unitPrice',
        'components',
        'description',
    ];

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: (data) => {
                this.product = data;
                this.dataSource = new MatTableDataSource<Product>(this.product);
                this.loadingProcess = false;
            },
            error: (err) => {
                this.snackService.showSnackBar(
                    'ERRORS.PRODUCTS_GETTING_ERROR',
                    SNACK_TYPE.error,
                );
                console.log(err);
            },
        });
    }
}
