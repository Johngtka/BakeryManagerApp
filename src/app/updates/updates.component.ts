import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from '@angular/material/table';

import { Update } from '../models/update';
import { UpdatesService } from '../services/updates.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';

@Component({
    selector: 'app-updates',
    templateUrl: './updates.component.html',
    styleUrls: ['./updates.component.css'],
})
export class UpdatesComponent implements OnInit {
    constructor(
        private updateService: UpdatesService,
        private snackService: SnackService,
    ) {}
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    update!: Update[];
    dataSource!: MatTableDataSource<Update, MatTableDataSourcePaginator>;
    loadingProcess: boolean = true;
    isSelected: boolean = false;
    displayedColumns: string[] = ['name', 'date', 'description'];
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
                    'UPDATES_GETTING_ERROR',
                    SNACK_TYPE.error,
                );
                console.log(err);
            },
        });
    }

    clickedRow(row: Update): void {
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
        if (this.logID.length >= 1) {
            this.isSelected = true;
        } else {
            this.isSelected = false;
        }
    }
}
