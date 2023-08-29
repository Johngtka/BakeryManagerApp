import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from '@angular/material/table';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { MatPaginator } from '@angular/material/paginator';

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
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    product!: Product[];
    logID: number[] = [];
    dataSource!: MatTableDataSource<Product, MatTableDataSourcePaginator>;
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
                this.dataSource.paginator = this.paginator;
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
    @HostListener('document:keydown', ['$event'])
    handleKeyEvent(event: KeyboardEvent): void {
        if (event.key === 'ArrowRight' && this.paginator.hasNextPage()) {
            this.paginator.nextPage();
        } else if (
            event.key === 'ArrowLeft' &&
            this.paginator.hasPreviousPage()
        ) {
            this.paginator.previousPage();
        }
    }
}
