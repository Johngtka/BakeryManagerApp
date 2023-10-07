import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from '@angular/material/table';

import { Update } from '../models/update';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { UpdatesService } from '../services/updates.service';
import { UpdateInputDialogComponent } from '../update-input-dialog/update-input-dialog.component';

@Component({
    selector: 'app-updates',
    templateUrl: './updates.component.html',
    styleUrls: ['./updates.component.css'],
})
export class UpdatesComponent implements OnInit {
    constructor(
        private updateService: UpdatesService,
        private snackService: SnackService,
        private dialog: MatDialog,
    ) {}

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    update!: Update[];
    dataSource!: MatTableDataSource<Update, MatTableDataSourcePaginator>;
    loadingProcess: boolean = true;
    displayedColumns: string[] = ['name', 'date', 'description', 'options'];
    logID: number[] = [];

    ngOnInit(): void {
        this.updateService.getUpdates().subscribe({
            next: (data) => {
                this.update = data;
                this.dataSource = new MatTableDataSource<Update>(this.update);
                this.dataSource.paginator = this.paginator;
                this.loadingProcess = false;
            },
            error: (err) => {
                this.snackService.showSnackBar(
                    'ERRORS.UPDATES_GETTING_ERROR',
                    SNACK_TYPE.error,
                );
                console.log(err);
            },
        });
    }

    clearSelect(): void {
        this.logID = [];
    }

    clickedRow(row: Update): void {
        const ID = this.logID.indexOf(row.id);
        if (ID !== -1) {
            this.logID.splice(ID, 1);
        } else {
            this.logID.push(row.id);
        }
    }

    openDialog(update?: Update): void {
        const dialogRef = this.dialog.open(UpdateInputDialogComponent, {
            data: {
                update,
            },
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result: Update) => {
            if (result) {
                this.updateTable(result);
                this.updateService.getUpdates().subscribe({
                    next: (data) => {
                        this.dataSource = new MatTableDataSource<Update>(data);
                        this.dataSource.paginator = this.paginator;
                        this.loadingProcess = false;
                    },
                    error: (err) => {
                        console.log(err);
                        this.snackService.showSnackBar(
                            'ERRORS.UPDATES_GETTING_ERROR',
                            SNACK_TYPE.error,
                        );
                    },
                });
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

    private updateTable(newOrUpdatedLogs: Update): void {
        if (!!this.update && !!newOrUpdatedLogs) {
            const tableUpdateIndex = this.update.findIndex(
                (li: Update) => li.id === newOrUpdatedLogs.id,
            );
            // li it is shortcut of log id
            if (tableUpdateIndex !== -1) {
                // update
                this.update[tableUpdateIndex] = newOrUpdatedLogs;
                this.update = [...this.update];
                this.dataSource = new MatTableDataSource<Update>(this.update);
                this.dataSource.paginator = this.paginator;
            } else {
                // new
                this.update = [...this.update, newOrUpdatedLogs];
                this.dataSource = new MatTableDataSource<Update>(this.update);
                this.dataSource.paginator = this.paginator;
            }
        }
    }
}
