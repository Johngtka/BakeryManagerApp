import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Sales } from '../models/sales';
import { SalesService } from '../services/sales.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { SalesInputDialogComponent } from '../sales-input-dialog/sales-input-dialog.component';
import {
    ConfirmDialogComponent,
    ConfirmationDialogResponse,
} from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
    constructor(
        private salesService: SalesService,
        private snackService: SnackService,
        private dialog: MatDialog,
    ) {}

    sale!: Sales[];
    saleID: number[] = [];
    dataSource!: MatTableDataSource<Sales>;
    loadingProcess: boolean = true;
    isSelected: boolean = false;
    displayedColumns: string[] = [
        'prodName',
        'startDate',
        'endDate',
        'value',
        'options',
    ];
    showLostConnection!: boolean;

    ngOnInit(): void {
        this.getSales();
    }

    clearSelect(): void {
        this.saleID = [];
    }

    clickedRow(row: Sales): void {
        const ID = this.saleID.indexOf(row.id);
        if (ID !== -1) {
            this.saleID.splice(ID, 1);
        } else {
            this.saleID.push(row.id);
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SalesInputDialogComponent, {
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result: Sales) => {
            if (result) {
                this.getSales();
            }
        });
    }

    deleteSale(saleObj: Sales): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'SALE_CONFIRM_DIALOG.TITLE',
                message: 'SALE_CONFIRM_DIALOG.MESSAGE',
                action: 'SALE_CONFIRM_DIALOG.ACTION',
            },
        });
        dialogRef.afterClosed().subscribe((response) => {
            if (response === ConfirmationDialogResponse.OK) {
                this.salesService.deleteSale(saleObj).subscribe({
                    next: () => {
                        this.sale = this.sale.filter((newList: Sales) => {
                            newList.id !== saleObj.id;
                        });
                        this.dataSource = new MatTableDataSource<Sales>(
                            this.sale,
                        );
                        this.getSales();
                        this.clearSelect();
                    },
                    error: (err) => {
                        this.snackService.showSnackBar(
                            'ERRORS.SALES_DELETE_ERROR',
                            SNACK_TYPE.error,
                        );
                        console.log(err);
                    },
                });
            } else if (response === ConfirmationDialogResponse.NOPE) {
                this.snackService.showSnackBar(
                    'INFO.STOPPED_SALE_REMOVING',
                    SNACK_TYPE.info,
                );
                this.saleID.splice(this.saleID.indexOf(saleObj.id), 1);
            }
        });
    }
    private getSales(): void {
        this.salesService.getSales().subscribe({
            next: (data) => {
                if (Array.isArray(data) && data.length > 0) {
                    this.sale = data;
                    this.dataSource = new MatTableDataSource<Sales>(this.sale);
                    this.loadingProcess = false;
                } else {
                    this.snackService.showSnackBar(
                        'INFO.SALES_EXISTING',
                        SNACK_TYPE.info,
                    );
                    setTimeout(() => {
                        this.loadingProcess = false;
                    }, 6000);
                }
            },
            error: (err) => {
                this.snackService.showSnackBar(
                    'ERRORS.SALES_GETTING_ERROR',
                    SNACK_TYPE.error,
                );

                setTimeout(() => {
                    this.loadingProcess = false;
                    this.showLostConnection = true;
                }, 3000);

                console.log(err);
            },
        });
    }
}
