import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { User } from '../models/user';
import { Order } from '../models/order';
import { UsersService } from '../services/users.service';
import { SnackService } from '../services/snack.service';

export interface NavigationObject {
    navigationId: number;
}

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
    constructor(
        private userService: UsersService,
        private snackService: SnackService,
    ) {}

    user!: User;
    orders!: Order[];
    dataSource!: MatTableDataSource<Order>;
    displayedColumns: string[] = [
        'fullNameWithCount',
        'fullTimeDate',
        'userContact',
        'orderComment',
        'options',
    ];
    loadingProcess: boolean = true;
    showEmptyStateForUser: boolean = false;

    ngOnInit(): void {
        this.user = {} as User;
        const userURL = history.state;
        if (this.checkIfUserExist(userURL)) {
            this.user = userURL;
            this.userService.getUserOrders(this.user).subscribe({
                next: (data) => {
                    this.orders = data;
                    this.dataSource = new MatTableDataSource<Order>(
                        this.orders,
                    );
                    this.loadingProcess = false;
                },
            });
        } else {
            console.log('no user');
        }
    }

    private checkIfUserExist(object: User | NavigationObject): object is User {
        return Object.hasOwn(object, 'name');
    }
}
