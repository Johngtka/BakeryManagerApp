import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from '@angular/material/table';

import { Product } from '../models/product';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { ProductsService } from '../services/products.service';

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
    clickedRow(row: Product): void {
        const ID = this.logID.indexOf(row.id);
        if (ID !== -1) {
            this.logID.splice(ID, 1);
            this.isSelected = false;
        } else {
            this.logID.push(row.id);
        }
        this.checkLogSelect();
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
    private checkLogSelect(): void {
        if (this.logID.length === 1) {
            this.isSelected = true;
        } else {
            this.isSelected = false;
        }
    }
}
