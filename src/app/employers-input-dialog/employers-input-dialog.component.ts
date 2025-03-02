import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
        @Inject(MAT_DIALOG_DATA) public data: { employer: Employers },
        private dialogRef: MatDialogRef<EmployersInputDialogComponent>,
        private employersService: EmployersService,
        private snackService: SnackService,
    ) {}

    isEdit!: boolean;
    titleText!: string;
    buttonText!: string;
    registerForm!: FormGroup;
    employersPositions: string[] = ['chief', 'regular'];
    originalFormValues!: Employers;

    ngOnInit(): void {
        if (this.data?.employer) {
            this.isEdit = true;
            this.titleText = 'EMPLOYERS_DIALOG.INFO.EDIT_EMPLOYER_TITLE';
            this.buttonText = 'EMPLOYERS_DIALOG.INFO.EDIT_EMPLOYER_BUTTON';
            this.registerForm = new FormGroup({
                login: new FormControl(this.data.employer.login, [
                    Validators.required,
                ]),
                password: new FormControl(this.data.employer.password, [
                    Validators.required,
                ]),
                email: new FormControl(this.data.employer.email, [
                    Validators.required,
                ]),
                position: new FormControl(this.data.employer.position),
            });
        } else {
            this.isEdit = false;
            this.titleText = 'EMPLOYERS_DIALOG.INFO.NEW_EMPLOYER_TITLE';
            this.buttonText = 'EMPLOYERS_DIALOG.INFO.NEW_EMPLOYER_BUTTON';
            this.registerForm = new FormGroup({
                login: new FormControl('', [Validators.required]),
                password: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required]),
                position: new FormControl('', [Validators.required]),
            });
        }
        this.originalFormValues = this.registerForm.value;
    }

    addEmployer(): void {
        const newEmployerData = this.registerForm.value;
        if (this.isEdit) {
            newEmployerData.id = this.data.employer.id;
            console.log('edit');
        } else {
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
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyEvent(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.dialogRef.close();
        }
    }
}
