import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from '@angular/material/table';

import { Sales } from '../models/sales';
import { SalesService } from '../services/sales.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { SalesInputDialogComponent } from '../sales-input-dialog/sales-input-dialog.component';

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

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    sale!: Sales[];
    saleID: number[] = [];
    dataSource!: MatTableDataSource<Sales, MatTableDataSourcePaginator>;
    loadingProcess: boolean = true;
    isSelected: boolean = false;
    displayedColumns: string[] = [
        'prodName',
        'startDate',
        'endDate',
        'value',
        'options',
    ];

    ngOnInit(): void {
        this.salesService.getSales().subscribe({
            next: (data) => {
                this.sale = data;
                this.dataSource = new MatTableDataSource<Sales>(this.sale);
                this.dataSource.paginator = this.paginator;
                this.loadingProcess = false;
            },
            error: (err) => {
                this.snackService.showSnackBar('', SNACK_TYPE.error);
                console.log(err);
            },
        });
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
    }

    clearSelect(): void {
        this.saleID = [];
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
