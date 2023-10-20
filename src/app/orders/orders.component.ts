import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from '@angular/material/table';

import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { User } from '../models/user';
import { Company } from '../models/company';
import { Order } from '../models/order';
import { NavigationObject } from '../models/navigation-object';
import { UsersService } from '../services/users.service';
import { SNACK_TYPE, SnackService } from '../services/snack.service';
import { CompanyService } from '../services/company.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
    constructor(
        private userService: UsersService,
        private snackService: SnackService,
        private companyService: CompanyService,
        private datePipe: DatePipe,
    ) {}

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    user!: User;
    company!: Company[];
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
        this.companyService.getCompany().subscribe({
            next: (data) => {
                this.company = data;
            },
            error: (err) => {
                console.log(err);
            },
        });
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

    openPDF(row: Order): void {
        const docDefinition = {
            info: {
                title: 'Order invoice of ' + this.user.login,
                creator: 'BakeryOnlineFactory Inc.',
            },
            header: [
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    text: this.datePipe.transform(
                                        Date.now(),
                                        'dd.MM.yyyy',
                                    ),
                                    margin: [20, 20],
                                },

                                {
                                    text: 'Upcoming Logo',
                                    margin: [20, 20],
                                    alignment: 'right',
                                },
                            ],
                        ],
                    },
                },
            ],
            content: [
                {
                    text:
                        'Order list of ' +
                        this.user.name +
                        ' ' +
                        this.user.surName,
                    alignment: 'center',
                    margin: [0, 40],
                },
                {
                    table: {
                        width: 'auto',
                        body: [
                            [
                                {
                                    text: 'Product Name',
                                    alignment: 'center',
                                },
                                {
                                    text: 'Count',
                                    alignment: 'center',
                                },
                                {
                                    text: 'Delivery Date',
                                    alignment: 'center',
                                },
                                {
                                    text: 'Delivery Time',
                                    alignment: 'center',
                                },
                                {
                                    text: 'Customer Email',
                                    alignment: 'center',
                                },
                                {
                                    text: 'Order Comment',
                                    alignment: 'center',
                                },
                            ],
                            [
                                {
                                    text: row.prodName,
                                    alignment: 'left',
                                },
                                {
                                    text: row.count,
                                    alignment: 'center',
                                },
                                {
                                    text: row.date,
                                    alignment: 'center',
                                },
                                {
                                    text: row.time,
                                    alignment: 'center',
                                },
                                {
                                    text: row.email,
                                    alignment: 'center',
                                },
                                {
                                    text: row.comment,
                                    alignment: 'left',
                                },
                            ],
                        ],
                    },
                },
            ],
        };
        // pdfMake
        //     .createPdf(docDefinition as TDocumentDefinitions)
        //     .download(
        //         docDefinition.info.title +
        //             ' created by ' +
        //             docDefinition.info.creator,
        //     );
        pdfMake.createPdf(docDefinition as TDocumentDefinitions).open();
    }

    private checkIfUserExist(object: User | NavigationObject): object is User {
        return Object.hasOwn(object, 'name');
    }
}
