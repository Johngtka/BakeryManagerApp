import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Update } from '../models/update';
import { UpdatesService } from '../services/updates.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';

@Component({
    selector: 'app-update-input-dialog',
    templateUrl: './update-input-dialog.component.html',
    styleUrls: ['./update-input-dialog.component.css'],
})
export class UpdateInputDialogComponent implements OnInit {
    constructor(
        private updateService: UpdatesService,
        private snackService: SnackService,
        private dialogRef: MatDialogRef<UpdateInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { update: Update },
    ) {}

    titleText!: string;
    isEdit!: boolean;
    buttonText!: string;
    registerForm!: FormGroup;
    originalFormValues!: Worker;

    ngOnInit(): void {
        if (this.data?.update) {
            this.isEdit = true;
            this.titleText = 'UPDATE_DIALOG.INFO.EDIT_LOG_TITLE';
            this.buttonText = 'UPDATE_DIALOG.INFO.EDIT_LOG_BUTTON';
            this.registerForm = new FormGroup({
                name: new FormControl(this.data.update.name, [
                    Validators.required,
                ]),
                date: new FormControl(this.data.update.date, [
                    Validators.required,
                ]),
                description: new FormControl(this.data.update.description, [
                    Validators.required,
                ]),
            });
        } else {
            this.isEdit = false;
            this.titleText = 'UPDATE_DIALOG.INFO.NEW_LOG_TITLE';
            this.buttonText = 'UPDATE_DIALOG.INFO.NEW_LOG_BUTTON';
            this.registerForm = new FormGroup({
                name: new FormControl('', [Validators.required]),
                date: new FormControl('', [Validators.required]),
                description: new FormControl('', [Validators.required]),
            });
        }
        this.originalFormValues = this.registerForm.value;
    }

    addUpdate() {
        const log = this.registerForm.value;
        console.log(log);
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
