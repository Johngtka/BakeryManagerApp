import { Component, OnInit, HostListener } from '@angular/core';

import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { Sales } from '../models/sales';
import { SalesService } from '../services/sales.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';

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
    ) {}

    titleText!: string;
    buttonText!: string;
    registerForm!: FormGroup;
    originalFormValues!: Sales;
    saleCode: string = this.generateRandomString(8);
    productsList: string[] = [
        'Tort Urodzinowy',
        'Tort dla Smakoszy',
        'Tort Jubileuszowy',
        'Tort Ślubny',
        'Ciasto Drożdżowe',
        'Ciasto Sernik',
        'Ciasto Browne',
        'Ciasto Dziecięce',
        'Tarta jabłkowa na mlecznym kremie',
        'Tarta wiosenna',
        'Tarta czekoladowo-orzechowa',
        'Tarta malinowa',
        'Ciasteczka Amerykańskie',
        'Ciasteczka Ziarna w Karmelu',
        'Ciasteczka owsiane z bakaliami',
        'Ciasteczka Cantuccini',
        'Bułka Przenna',
        'Bułka Kajzerka',
        'Bułka Razowa',
        'Bułka Ziarnista',
        'Babeczka Czekoladowa Biała',
        'Babeczka Czekoladowa Czarna',
        'Babeczka Malinowa',
        'Babeczka Sezonowa',
    ];

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
        this.originalFormValues = this.registerForm.value;
    }

    addSale(): void {
        const saleFormValue = this.registerForm.value;
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
