import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from '@angular/material/table';

import { User } from '../models/user';
import { Order } from '../models/order';
import { NavigationObject } from '../models/navigation-object';
import { UsersService } from '../services/users.service';
import { SNACK_TYPE, SnackService } from '../services/snack.service';

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

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    user!: User;
    orders!: Order[];
    orderId: number[] = [];
    dataSource!: MatTableDataSource<Order, MatTableDataSourcePaginator>;
    paginatorStep!: number;
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
                    this.paginatorStep = data.length;
                    if (this.paginatorStep < 1) {
                        setTimeout(() => {
                            this.snackService.showSnackBar(
                                'INFO.ORDERS_EXISTING',
                                SNACK_TYPE.info,
                            );
                        }, 3000);
                    } else {
                        this.orders = data;
                        this.dataSource = new MatTableDataSource<Order>(
                            this.orders,
                        );
                        this.dataSource.paginator = this.paginator;

                        this.loadingProcess = false;
                    }
                },
                error: (err) => {
                    this.snackService.showSnackBar(
                        'ERRORS.ORDERS_GETTING_ERROR',
                        SNACK_TYPE.error,
                    );
                    console.log(err);
                },
            });
        } else {
            this.loadingProcess = false;
            this.showEmptyStateForUser = true;
        }
    }

    clickedRow(row: Order): void {
        const ID = this.orderId.indexOf(row.id);
        if (ID !== -1) {
            this.orderId.splice(ID, 1);
        } else {
            this.orderId.push(row.id);
        }
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

    private checkIfUserExist(object: User | NavigationObject): object is User {
        return Object.hasOwn(object, 'name');
    }
}
