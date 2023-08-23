import { Component, OnInit, ViewChild } from '@angular/core';

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
    displayedColumns: string[] = ['name', 'date', 'description'];

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
}
