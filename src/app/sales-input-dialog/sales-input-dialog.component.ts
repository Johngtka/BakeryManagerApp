import { Component, OnInit, HostListener, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Sales } from '../models/sales';
import { SalesService } from '../services/sales.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { SalesProductsList } from '../models/sales-products-list';

@Component({
    selector: 'app-sales-input-dialog',
    templateUrl: './sales-input-dialog.component.html',
    styleUrls: ['./sales-input-dialog.component.css'],
})
export class SalesInputDialogComponent implements OnInit {
    constructor(
        private dialogRef: MatDialogRef<SalesInputDialogComponent>,
        private salesService: SalesService,
        private snackService: SnackService,
        private datePipe: DatePipe,
    ) {}

    private readonly _adapter =
        inject<DateAdapter<unknown, unknown>>(DateAdapter);
    private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));

    titleText!: string;
    buttonText!: string;
    registerForm!: FormGroup;
    originalFormValues!: Sales;
    saleCode: string = this.generateRandomString(8);
    productsList: SalesProductsList[] = [];

    ngOnInit(): void {
        this.titleText = 'SALES_DIALOG.INFO.NEW_SALE_TITLE';
        this.buttonText = 'SALES_DIALOG.INFO.NEW_SALE_BUTTON';
        this.registerForm = new FormGroup({
            productName: new FormControl('', [Validators.required]),
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required]),
            value: new FormControl('', [Validators.required]),
            saleCode: new FormControl(this.saleCode),
        });
        this._locale.set('pl');
        this._adapter.setLocale(this._locale());
        this.originalFormValues = this.registerForm.value;

        this.salesService.getListOfProducts().subscribe({
            next: (data) => {
                this.productsList = data;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    addSale(): void {
        const saleFormValue = this.registerForm.value;

        saleFormValue.startDate = this.datePipe.transform(
            saleFormValue.startDate,
            'yyyy-MM-dd',
        );

        saleFormValue.endDate = this.datePipe.transform(
            saleFormValue.endDate,
            'yyyy-MM-dd',
        );

        this.salesService.postSale(saleFormValue).subscribe({
            next: (newSale) => {
                this.dialogRef.close(newSale);
                this.snackService.showSnackBar(
                    'SUCCESS.SALE_ADD',
                    SNACK_TYPE.success,
                );
            },
            error: (err) => {
                this.snackService.showSnackBar(
                    'ERRORS.SALES_ADD_ERROR',
                    SNACK_TYPE.error,
                );
                console.log(err);
            },
        });
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyEvent(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.dialogRef.close();
        }
    }

    private generateRandomString(length: number) {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345678910';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length),
            );
        }
        return result;
    }
}
