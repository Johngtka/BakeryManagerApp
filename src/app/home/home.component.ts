import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
        private router: Router,
        private userService: UsersService,
        private snackService: SnackService,
    ) {}

    user!: User[];
    dataSource!: MatTableDataSource<User>;
    loadingProcess: boolean = true;
    displayedColumns: string[] = ['name', 'surname', 'nick', 'phone', 'email'];
    showLostConnection!: boolean;

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

                setTimeout(() => {
                    this.loadingProcess = false;
                    this.showLostConnection = true;
                }, 3000);

                console.log(err);
            },
        });
    }

    openUserOrders(row: User): void {
        this.router.navigate(['user/orders'], { state: row });
    }
}
