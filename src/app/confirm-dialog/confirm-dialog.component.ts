import { Component, Inject, HostListener } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Confirm } from '../models/confirm';

export enum ConfirmationDialogResponse {
    OK,
    NOPE,
}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<ConfirmationDialogResponse>,
        @Inject(MAT_DIALOG_DATA) public data: Confirm,
    ) {}

    confirm(): void {
        this.dialogRef.close(ConfirmationDialogResponse.OK);
    }

    close(): void {
        this.dialogRef.close(ConfirmationDialogResponse.NOPE);
    }

    @HostListener('document:keydown', ['event'])
    keyBoardClose(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.dialogRef.close();
        }
    }
}
