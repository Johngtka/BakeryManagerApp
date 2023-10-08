import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from '@angular/material/table';

import { Product } from '../models/product';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { ProductsService } from '../services/products.service';
import {
    ConfirmDialogComponent,
    ConfirmationDialogResponse,
} from '../confirm-dialog/confirm-dialog.component';
import { ProductInputDialogComponent } from '../product-input-dialog/product-input-dialog.component';

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
        private dialog: MatDialog,
        private snackService: SnackService,
        private productService: ProductsService,
    ) {}

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    product!: Product[];
    prodID: number[] = [];
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

    clearSelect(): void {
        this.prodID = [];
    }

    clickedRow(row: Product): void {
        const ID = this.prodID.indexOf(row.id);
        if (ID !== -1) {
            this.prodID.splice(ID, 1);
            this.isSelected = false;
        } else {
            this.prodID.push(row.id);
        }
        this.checkLogSelect();
    }

    openDialog(product?: Product): void {
        const dialogRef = this.dialog.open(ProductInputDialogComponent, {
            data: {
                product,
            },
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result: Product) => {
            if (result) {
                this.updateProductsTable(result);
                this.productService.getProducts().subscribe({
                    next: (data) => {
                        this.dataSource = new MatTableDataSource<Product>(data);
                        this.dataSource.paginator = this.paginator;
                        this.loadingProcess = false;
                    },
                    error: (err) => {
                        console.log(err);
                        this.snackService.showSnackBar(
                            'ERRORS.PRODUCTS_GETTING_ERROR',
                            SNACK_TYPE.error,
                        );
                    },
                });
            }
        });
    }

    deleteProduct(product: Product): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'PRODUCT_CONFIRM_DIALOG.TITLE',
                message: 'PRODUCT_CONFIRM_DIALOG.MESSAGE',
                action: 'PRODUCT_CONFIRM_DIALOG.ACTION',
            },
        });
        dialogRef.afterClosed().subscribe((response) => {
            if (response === ConfirmationDialogResponse.OK) {
                this.productService.deleteProduct(product).subscribe({
                    next: () => {
                        this.product = this.product.filter(
                            (newList: Product) => {
                                newList.id !== product.id;
                            },
                        );
                        this.dataSource = new MatTableDataSource<Product>(
                            this.product,
                        );
                        this.clearSelect();
                        this.snackService.showSnackBar(
                            'SUCCESS.PRODUCT_REMOVED',
                            SNACK_TYPE.success,
                        );
                        this.productService.getProducts().subscribe({
                            next: (newList) => {
                                this.dataSource =
                                    new MatTableDataSource<Product>(newList);
                                this.loadingProcess = false;
                                this.dataSource.paginator = this.paginator;
                            },
                            error: (err) => {
                                this.snackService.showSnackBar(
                                    'ERRORS.PRODUCTS_GETTING_ERROR',
                                    SNACK_TYPE.error,
                                );
                                console.log(err);
                            },
                        });
                    },
                    error: (err) => {
                        this.snackService.showSnackBar(
                            'ERRORS.PRODUCT_DELETE_ERROR',
                            SNACK_TYPE.error,
                        );
                        console.log(err);
                    },
                });
            } else if (response === ConfirmationDialogResponse.NOPE) {
                this.snackService.showSnackBar(
                    'INFO.STOPPED_PRODUCT_REMOVING',
                    SNACK_TYPE.info,
                );
                this.prodID.splice(this.prodID.indexOf(product.id), 1);
            }
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

    private checkLogSelect(): void {
        if (this.prodID.length === 1) {
            this.isSelected = true;
        } else {
            this.isSelected = false;
        }
    }

    private updateProductsTable(newOrUpdatedProd: Product): void {
        if (!!this.product && !!newOrUpdatedProd) {
            const tableProductIndex = this.product.findIndex(
                (pi: Product) => pi.id === newOrUpdatedProd.id,
            );
            // pi it is shortcut of product id
            if (tableProductIndex !== -1) {
                // update
                this.product[tableProductIndex] = newOrUpdatedProd;
                this.product = [...this.product];
                this.dataSource = new MatTableDataSource<Product>(this.product);
                this.dataSource.paginator = this.paginator;
            } else {
                // new
                this.product = [...this.product, newOrUpdatedProd];
                this.dataSource = new MatTableDataSource<Product>(this.product);
                this.dataSource.paginator = this.paginator;
            }
        }
    }
}
