import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../models/user';
import { Order } from '../models/order';
import { NavigationObject } from '../models/navigation-object';
import { UsersService } from '../services/users.service';
import { SNACK_TYPE, SnackService } from '../services/snack.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
    constructor(
        private datePipe: DatePipe,
        private userService: UsersService,
        private snackService: SnackService,
    ) {}

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    date = new Date();
    user!: User;
    orders!: Order[];
    orderId: number[] = [];
    dataSource!: MatTableDataSource<Order>;
    loadingProcess: boolean = true;
    paginatorStep!: number;
    showEmptyStateForUser: boolean = false;
    showBufferingCheckProcess!: boolean;
    discountCodeCheckingProcess!: boolean;
    displayedColumns: string[] = [
        'fullNameWithCount',
        'orderTimeAndDate',
        'userContact',
        'orderComment',
        'discountCode',
        'options',
    ];
    showLostConnection!: boolean;

    ngOnInit(): void {
        this.user = {} as User;
        const userURL = history.state;
        if (this.checkIfUserExist(userURL)) {
            this.user = userURL;
            this.userService.getUserOrders(this.user).subscribe({
                next: (data) => {
                    if (Array.isArray(data) && data.length >= 1) {
                        this.orders = data;
                        this.dataSource = new MatTableDataSource<Order>(
                            this.orders,
                        );
                        this.dataSource.paginator = this.paginator;
                        this.paginatorStep = data.length;
                        this.loadingProcess = false;
                    } else {
                        this.paginatorStep = data.length;
                        this.snackService.showSnackBar(
                            'INFO.ORDERS_EXISTING',
                            SNACK_TYPE.info,
                        );
                        setTimeout(() => {
                            this.loadingProcess = false;
                        }, 3000);
                    }
                },
                error: (err) => {
                    this.snackService.showSnackBar(
                        'ERRORS.ORDERS_GETTING_ERROR',
                        SNACK_TYPE.error,
                    );

                    setTimeout(() => {
                        this.loadingProcess = false;
                        this.showLostConnection = true;
                    }, 3000);

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
            this.discountCodeChecker(row);
        }
    }

    clearSelect(): void {
        this.orderId = [];
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

    openPDF(order: Order): void {
        const docDefinition = {
            info: {
                title: 'Order invoice of ' + this.user.login,
                creator: 'BakeryOnlineFactory',
            },
            header: [
                {
                    layout: 'noBorders',
                    table: {
                        // widths: ['50%', '50%'],
                        width: '*',
                        body: [
                            [
                                {
                                    text:
                                        'Issue date: ' +
                                        this.datePipe.transform(
                                            Date.now(),
                                            'dd.MM.yyyy',
                                        ),
                                    style: 'header',
                                },

                                // {
                                //     text: 'Upcoming Logo',
                                //     style: 'header',
                                //     alignment: 'right',
                                // },
                            ],
                        ],
                    },
                },
            ],
            content: [
                {
                    text: `Dear Customer,

                    Thank you for placing your order in our shop. We would like to inform you that your order will be delivered within the next week. Our company is committed to ensuring the fastest possible delivery.

                    Our team is currently prepared to process your order and shipping will take place within one to two working days. This means that your products will be carefully packed and dispatched as quickly as possible.

                    If you have any questions or need additional information regarding your order, please do not hesitate to contact us. Our customer service is available to help you.

                    All messages regarding the progress of your order will be sent to the email you specified in your order.

                    Thank you for choosing our shop and the trust you have placed in our products. We are sure that you will be satisfied with the quality of our products and services.

                    Greetings,
                    Customer Service Team`,
                    style: 'textContent',
                },
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    text: 'Seller',
                                    style: 'sellerAndBuyerSection',
                                },
                                {
                                    text: 'Buyer',
                                    style: 'sellerAndBuyerSection',
                                },
                            ],
                            [
                                {
                                    text: 'Wypiekarnia S.A',
                                    style: 'sellerAndBuyerTableCell',
                                },
                                {
                                    text:
                                        this.user.name +
                                        ' ' +
                                        this.user.surName,
                                    style: 'sellerAndBuyerTableCell',
                                },
                            ],
                            [
                                {
                                    text: 'Chrobrego 8a',
                                    style: 'sellerAndBuyerTableCell',
                                },
                                {
                                    text: '',
                                    style: 'sellerAndBuyerTableCell',
                                },
                            ],
                            [
                                {
                                    text: '64-980 Trzcianka',
                                    style: 'sellerAndBuyerTableCell',
                                },
                                {
                                    text: '',
                                    style: 'sellerAndBuyerTableCell',
                                },
                            ],
                            [
                                {
                                    text: 'Polska',
                                    style: 'sellerAndBuyerTableCell',
                                },
                                {
                                    text: '',
                                    style: 'sellerAndBuyerTableCell',
                                },
                            ],
                        ],
                    },
                },
                {
                    text: 'Ordered Product:',
                    style: 'orderedProductSection',
                },
                {
                    table: {
                        width: 'auto',
                        body: [
                            [
                                {
                                    text: 'Product Name',
                                    style: 'orderTableHeaderCell',
                                },
                                {
                                    text: 'Count',
                                    style: 'orderTableHeaderCell',
                                },
                                {
                                    text: 'Order Date',
                                    style: 'orderTableHeaderCell',
                                },
                                {
                                    text: 'Order Time',
                                    style: 'orderTableHeaderCell',
                                },
                                {
                                    text: 'Customer Login',
                                    style: 'orderTableHeaderCell',
                                },
                            ],
                            [
                                {
                                    text: order.prodName,
                                    style: 'orderTableCell',
                                },
                                {
                                    text: order.count,
                                    style: 'orderTableCell',
                                },
                                {
                                    text: order.orderDate,
                                    style: 'orderTableCell',
                                },
                                {
                                    text: order.orderTime,
                                    style: 'orderTableCell',
                                },
                                {
                                    text: this.user.login,
                                    style: 'orderTableCell',
                                },
                            ],
                        ],
                    },
                },
                {
                    text: this.discountOutputConfig(),
                    style: 'orderedProductSection',
                },
            ],

            footer: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        width: '100%',
                        body: [
                            [
                                {
                                    text: '',
                                },
                            ],
                            [
                                {
                                    text:
                                        'All rights reserved ©' +
                                        this.date.getFullYear() +
                                        ` This document contains confidential information intended for the exclusive use of the company and its partners. Copying or distribution without the consent of BakeryOnlineFactory Inc. is prohibited.`,
                                    style: 'footer',
                                },
                            ],
                        ],
                    },
                },
            ],

            styles: {
                header: {
                    margin: [20, 20],
                    bold: true,
                },
                sellerAndBuyerSection: {
                    alignment: 'left',
                    bold: true,
                    fontSize: 14,
                    margin: [0, 10],
                },
                sellerAndBuyerTableCell: {
                    margin: [20, 0, 0, 0],
                    italics: true,
                },
                textContent: {
                    alignment: 'left',
                    italics: true,
                    fontSize: 12,
                    margin: [0, 30],
                },
                orderedProductSection: {
                    alignment: 'left',
                    margin: [0, 20],
                    bold: true,
                },
                orderTableHeaderCell: {
                    alignment: 'center',
                    margin: 5,
                    fontSize: 10,
                    bold: true,
                    italics: true,
                },
                orderTableCell: {
                    alignment: 'center',
                    margin: [3, 10, 2, 10],
                },
                footer: {
                    alignment: 'center',
                    margin: [50, 5, 50, 5],
                    fontSize: 8,
                    italics: true,
                },
            },
        };
        pdfMake
            .createPdf(docDefinition as unknown as TDocumentDefinitions)
            .download(
                docDefinition.info.title +
                    ' created by ' +
                    docDefinition.info.creator,
            );
        // pdfMake
        //     .createPdf(docDefinition as unknown as TDocumentDefinitions)
        //     .open();
    }

    private discountCodeChecker(row: Order): void {
        this.showBufferingCheckProcess = false;
        this.userService.checkForOrderDiscountCode(row).subscribe({
            next: (data) => {
                if (Array.isArray(data) && data.length >= 1) {
                    this.discountCodeCheckingProcess = true;
                    this.discountOutputConfig();
                } else {
                    this.discountCodeCheckingProcess = false;
                    this.discountOutputConfig();
                }
            },
            error: (err) => {
                setTimeout(() => {
                    this.loadingProcess = false;
                    this.showLostConnection = true;
                }, 3000);

                console.log(err);
            },
        });
        setTimeout(() => {
            this.showBufferingCheckProcess = true;
        }, 1000);
    }

    private discountOutputConfig(): string {
        if (this.discountCodeCheckingProcess) {
            return 'Successfully charged discount on ordered product';
        } else {
            return 'No discount due to incorrect or non-existent code';
        }
    }

    private checkIfUserExist(object: User | NavigationObject): object is User {
        return Object.hasOwn(object, 'name');
    }
}
