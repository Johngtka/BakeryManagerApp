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

    ngOnInit(): void {
        if (this.data?.product) {
            this.isEdit = true;
            this.titleText = 'PRODUCT_DIALOG.INFO.EDIT_PROD_TITLE';
            this.buttonText = 'PRODUCT_DIALOG.INFO.EDIT_PROD_BUTTON';
            this.registerForm = new FormGroup({
                name: new FormControl(this.data.product.name, [
                    Validators.required,
                ]),
                price: new FormControl(this.data.product.price, [
                    Validators.required,
                ]),
                weight: new FormControl(this.data.product.weight, [
                    Validators.required,
                ]),
                components: new FormControl(this.data.product.components),
                description: new FormControl(this.data.product.description),
            });
        } else {
            this.isEdit = false;
            this.titleText = 'PRODUCT_DIALOG.INFO.ADD_PROD_TITLE';
            this.buttonText = 'PRODUCT_DIALOG.INFO.ADD_PROD_BUTTON';
            this.registerForm = new FormGroup({
                name: new FormControl('', [Validators.required]),
                price: new FormControl('', [Validators.required]),
                weight: new FormControl('', [Validators.required]),
                components: new FormControl(''),
                description: new FormControl(''),
            });
        }
        this.originalFormValues = this.registerForm.value;
    }

    addProduct(): void {
        const prodFormData = this.registerForm.value;
        if (this.isEdit) {
            prodFormData.id = this.data.product.id;
            // products service edit product in next close dialog with results of type product
            this.productService.editProduct(prodFormData).subscribe({
                next: (editProd: Product) => {
                    this.dialogRef.close(editProd);
                    this.snackService.showSnackBar(
                        'SUCCESS.PRODUCT_EDITED',
                        SNACK_TYPE.success,
                    );
                },
                error: (err) => {
                    console.log(err);
                    this.snackService.showSnackBar(
                        'ERRORS.PRODUCT_EDIT_ERROR',
                        SNACK_TYPE.error,
                    );
                },
            });
        } else {
            // products service post product in next close dialog with results without type product
            this.productService.postProduct(prodFormData).subscribe({
                next: (newProd) => {
                    this.dialogRef.close(newProd);
                    this.snackService.showSnackBar(
                        'SUCCESS.PRODUCT_ADDED',
                        SNACK_TYPE.success,
                    );
                },
                error: (err) => {
                    console.log(err);
                    this.snackService.showSnackBar(
                        'ERRORS.PRODUCT_ADD_ERROR',
                        SNACK_TYPE.error,
                    );
                },
            });
        }
    }

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
