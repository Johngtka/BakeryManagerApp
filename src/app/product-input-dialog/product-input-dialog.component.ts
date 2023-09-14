import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';

@Component({
    selector: 'app-product-input-dialog',
    templateUrl: './product-input-dialog.component.html',
    styleUrls: ['./product-input-dialog.component.css'],
})
export class ProductInputDialogComponent implements OnInit {
    constructor(
        private productService: ProductsService,
        private snackService: SnackService,
        private dialogRef: MatDialogRef<ProductInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    ) {}

    titleText!: string;
    isEdit!: boolean;
    buttonText!: string;
    registerForm!: FormGroup;
    originalFormValues!: Product;

    ngOnInit(): void {}

    hasChange() {
        return (
            JSON.stringify(this.registerForm.value) !==
            JSON.stringify(this.originalFormValues)
        );
    }
    @HostListener('document:keydown', ['$event'])
    keyboardCloseDialog(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.dialogRef.close();
        }
    }
}
