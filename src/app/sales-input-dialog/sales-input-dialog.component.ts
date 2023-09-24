import { Component, OnInit } from '@angular/core';

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
        private salesService: SalesService,
        private snackService: SnackService,
        private dialogRef: MatDialogRef<SalesInputDialogComponent>,
    ) {}

    titleText!: string;
    buttonText!: string;
    registerForm!: FormGroup;
    originalFormValues!: Sales;
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
            ProductName: new FormControl('', [Validators.required]),
            StartDate: new FormControl('', [Validators.required]),
            EndDate: new FormControl('', [Validators.required]),
            Value: new FormControl('', [Validators.required]),
        });
        this.originalFormValues = this.registerForm.value;
    }
}
