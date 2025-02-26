import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Employers } from '../models/employers';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { EmployersService } from '../services/employers.service';

@Component({
    selector: 'app-emm',
    templateUrl: './emm.component.html',
    styleUrl: './emm.component.css',
})
export class EMMComponent implements OnInit {
    constructor(
        private employerService: EmployersService,
        private snackService: SnackService,
    ) {}

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    employer!: Employers[];
    dataSource!: MatTableDataSource<Employers>;
    loadingProcess: boolean = true;
    displayedColumns: string[] = ['login', 'password', 'email', 'position'];
    showLostConnection!: boolean;

    ngOnInit(): void {
        this.getEmployers();
    }

    private getEmployers(): void {
        this.employerService.getEmployers().subscribe({
            next: (data) => {
                this.employer = data;
                this.dataSource = new MatTableDataSource<Employers>(
                    this.employer,
                );
                this.dataSource.paginator = this.paginator;
                this.loadingProcess = false;
            },
            error: (err) => {
                this.snackService.showSnackBar(
                    'ERRORS.PRODUCTS_GETTING_ERROR',
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
