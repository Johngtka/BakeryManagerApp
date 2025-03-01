import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { Employers } from '../models/employers';
import { EmployersService } from '../services/employers.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';

@Component({
    selector: 'app-employers-input-dialog',
    templateUrl: './employers-input-dialog.component.html',
    styleUrl: './employers-input-dialog.component.css',
})
export class EmployersInputDialogComponent implements OnInit {
    constructor(
        private dialogRef: MatDialogRef<EmployersInputDialogComponent>,
        private employersService: EmployersService,
        private snackService: SnackService,
    ) {}

    titleText!: string;
    buttonText!: string;
    registerForm!: FormGroup;
    employersPositions: string[] = ['chief', 'regular'];
    originalFormValues!: Employers;

    ngOnInit(): void {
        this.titleText = 'EMPLOYERS_DIALOG.INFO.NEW_EMPLOYER_TITLE';
        this.buttonText = 'EMPLOYERS_DIALOG.INFO.NEW_EMPLOYER_BUTTON';
        this.registerForm = new FormGroup({
            login: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            position: new FormControl('', [Validators.required]),
        });
        this.originalFormValues = this.registerForm.value;
    }

    addEmployer(): void {
        const newEmployerData = this.registerForm.value;
        this.employersService.postNewEmployer(newEmployerData).subscribe({
            next: (NewEmp) => {
                this.dialogRef.close(NewEmp);
                this.snackService.showSnackBar(
                    'SUCCESS.EMPLOYER_ADD',
                    SNACK_TYPE.success,
                );
            },
            error: (err) => {
                console.log(err);
                this.snackService.showSnackBar(
                    'ERRORS.EMPLOYER_ADD_ERROR',
                    SNACK_TYPE.error,
                );
            },
        });
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyEvent(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.dialogRef.close();
        }
    }
}
