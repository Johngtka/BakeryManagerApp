import {
    Component,
    OnInit,
    AfterViewInit,
    HostListener,
    ViewChild,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Update } from '../models/update';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { UpdatesService } from '../services/updates.service';
import { UpdateInputDialogComponent } from '../update-input-dialog/update-input-dialog.component';

@Component({
    selector: 'app-updates',
    templateUrl: './updates.component.html',
    styleUrls: ['./updates.component.css'],
})
export class UpdatesComponent implements AfterViewInit, OnInit {
    constructor(
        private updateService: UpdatesService,
        private snackService: SnackService,
        private observer: BreakpointObserver,
        private dialog: MatDialog,
    ) {}

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    logID: number[] = [];
    update!: Update[];
    dataSource!: MatTableDataSource<Update>;
    loadingProcess: boolean = true;
    isScreenDetected!: boolean;
    displayedColumns: string[] = ['name', 'date', 'description', 'options'];
    dialogOpeningDetect: boolean = false;
    showLostConnection!: boolean;

    ngOnInit(): void {
        this.getUpdates();
    }

    ngAfterViewInit(): void {
        this.observer
            .observe(['(max-width: 1209px)'])
            .subscribe((isMatches) => {
                if (isMatches.matches) {
                    this.isScreenDetected = true;
                    this.getUpdates();
                } else {
                    this.isScreenDetected = false;
                    this.getUpdates();
                }
            });
    }

    clearSelect(): void {
        this.logID = [];
    }

    selectAll(): void {
        this.logID = this.dataSource.data.map((item) => item.id);
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

        dialogRef.afterOpened().subscribe(() => {
            this.dialogOpeningDetect = true;
        });

        dialogRef.afterClosed().subscribe((result: Update) => {
            if (result) {
                this.getUpdates();
            }
            this.dialogOpeningDetect = false;
        });
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyEvent(event: KeyboardEvent): void {
        if (this.dialogOpeningDetect) {
            return;
        }

        if (event.key === 'ArrowRight' && this.paginator.hasNextPage()) {
            this.paginator.nextPage();
        } else if (
            event.key === 'ArrowLeft' &&
            this.paginator.hasPreviousPage()
        ) {
            this.paginator.previousPage();
        }
    }

    private getUpdates(): void {
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

                setTimeout(() => {
                    this.loadingProcess = false;
                    this.showLostConnection = true;
                }, 3000);

                console.log(err);
            },
        });
    }
}
