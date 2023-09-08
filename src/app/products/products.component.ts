import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';

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
    animations: [
        trigger('editHovered', [
            state(
                'inactive',
                style({
                    background: 'white',
                }),
            ),
            state(
                'active',
                style({
                    background: 'green',
                    color: 'white',
                }),
            ),
            transition('inactive => active', animate('240ms ease-in')),
            transition('active => inactive', animate('400ms ease-out')),
        ]),
        trigger('deleteHovered', [
            state(
                'inactive',
                style({
                    background: 'white',
                }),
            ),
            state(
                'active',
                style({
                    background: 'red',
                    color: 'white',
                }),
            ),
            transition('inactive => active', animate('240ms ease-in')),
            transition('active => inactive', animate('400ms ease-out')),
        ]),
    ],
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
        'options',
    ];
    isEditHovered: string = 'inactive';
    isDeleteHovered: string = 'inactive';

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

    clearSelect() {
        this.logID = [];
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
