import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor(
        private userService: UsersService,
        private snackService: SnackService,
    ) {}

    user!: User[];
    dataSource!: MatTableDataSource<User>;
    loadingProcess: boolean = true;
    usersId: number[] = [];
    isSelected: boolean = false;
    displayedColumns: string[] = ['name', 'surname', 'nick', 'phone', 'email'];

    ngOnInit(): void {
        this.userService.getUsers().subscribe({
            next: (data) => {
                this.user = data;
                this.dataSource = new MatTableDataSource<User>(this.user);
                this.loadingProcess = false;
            },
            error: (err) => {
                this.snackService.showSnackBar(
                    'ERRORS.USERS_GETTING_ERROR',
                    SNACK_TYPE.error,
                );
                console.log(err);
            },
        });
    }

    clickedRow(row: User): void {
        const ID = this.usersId.indexOf(row.id);
        if (ID !== -1) {
            this.usersId.splice(ID, 1);
        } else {
            this.usersId.push(row.id);
        }
    }
}
