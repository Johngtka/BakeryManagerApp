import { Component, Inject, OnInit } from '@angular/core';
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

    dialogTitle!: string;
    actionButton!: string;
    isEdit!: boolean;
    registerForm!: FormGroup;
    originalFormValues!: Update;
    logId!: number;

    ngOnInit(): void {
        if (this.data?.update) {
            this.isEdit = true;
            this.actionButton = 'aktualizuj';
            this.dialogTitle = 'edycja logów';
            this.logId = this.data.update.id;
            this.registerForm = new FormGroup({
                name: new FormControl(this.data.update.Nazwa, [
                    Validators.required,
                ]),
                date: new FormControl(this.data.update.Data, [
                    Validators.required,
                ]),
                description: new FormControl(this.data.update.Opis, [
                    Validators.required,
                ]),
            });
        } else {
            this.isEdit = false;
            this.actionButton = 'dodaj';
            this.dialogTitle = 'nowe logi';
            this.registerForm = new FormGroup({
                name: new FormControl('', [Validators.required]),
                date: new FormControl('', [Validators.required]),
                description: new FormControl('', [Validators.required]),
            });
        }
        this.originalFormValues = this.registerForm.value;
    }
}
