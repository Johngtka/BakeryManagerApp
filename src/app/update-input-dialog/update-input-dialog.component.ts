import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

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
        @Inject(MAT_DIALOG_DATA) public data: { update: Update },
        private dialogRef: MatDialogRef<UpdateInputDialogComponent>,
        private snackService: SnackService,
        private updateService: UpdatesService,
    ) {}

    isEdit!: boolean;
    titleText!: string;
    buttonText!: string;
    registerForm!: FormGroup;
    originalFormValues!: Update;

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

    addUpdate(): void {
        const logFormValues = this.registerForm.value;
        if (this.isEdit) {
            logFormValues.id = this.data.update.id;
            this.updateService.editUpdate(logFormValues).subscribe({
                next: (editLog: Update) => {
                    this.dialogRef.close(editLog);
                    this.snackService.showSnackBar(
                        'SUCCESS.UPDATE_LOG_EDIT',
                        SNACK_TYPE.success,
                    );
                },
                error: (err) => {
                    console.log(err);
                    this.snackService.showSnackBar(
                        'ERRORS.UPDATES_EDITING_ERROR',
                        SNACK_TYPE.error,
                    );
                },
            });
        } else {
            this.updateService.postUpdate(logFormValues).subscribe({
                next: (newLog) => {
                    this.dialogRef.close(newLog);
                    this.snackService.showSnackBar(
                        'SUCCESS.UPDATE_LOG_ADD',
                        SNACK_TYPE.success,
                    );
                },
                error: (err) => {
                    console.log(err);
                    this.snackService.showSnackBar(
                        'ERRORS.UPDATES_POSTING_ERROR',
                        SNACK_TYPE.error,
                    );
                },
            });
        }
    }

    hasChange(): boolean | void {
        return (
            JSON.stringify(this.registerForm.value) !==
            JSON.stringify(this.originalFormValues)
        );
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyEvent(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.dialogRef.close();
        }
    }
}
