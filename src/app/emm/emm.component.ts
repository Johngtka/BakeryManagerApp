import { Component, OnInit, ViewChild } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Employers } from '../models/employers';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { EmployersService } from '../services/employers.service';

@Component({
    selector: 'app-emm',
    templateUrl: './emm.component.html',
    styleUrl: './emm.component.css',
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
export class EMMComponent implements OnInit {
    constructor(
        private employerService: EmployersService,
        private snackService: SnackService,
    ) {}

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    empID: number[] = [];
    employer!: Employers[];
    dataSource!: MatTableDataSource<Employers>;
    isEditHovered: string = 'inactive';
    loadingProcess: boolean = true;
    isDeleteHovered: string = 'inactive';
    displayedColumns: string[] = [
        'login',
        'password',
        'email',
        'position',
        'options',
    ];
    showLostConnection!: boolean;

    ngOnInit(): void {
        this.getEmployers();
    }

    clearSelect(): void {
        this.empID = [];
    }

    clickedRow(row: Employers): void {
        const ID = this.empID.indexOf(row.id);
        if (ID !== -1) {
            this.empID.splice(ID, 1);
        } else {
            this.empID.push(row.id);
        }
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
