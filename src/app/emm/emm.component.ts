import { Component, OnInit } from '@angular/core';

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

    dataSource!: MatTableDataSource<Employers>;
    loadingProcess: boolean = true;
    displayedColumns: string[] = ['login', 'password', 'email', 'position'];
    showLostConnection!: boolean;

    ngOnInit(): void {}

    private getEmployers(): void {}
}
