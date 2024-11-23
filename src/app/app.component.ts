import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    HostListener,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

import { MatSidenav } from '@angular/material/sidenav';

import { delay } from 'rxjs/operators';
import { Employers } from './models/employers';
import { environment } from 'src/environments/environment';
import { SnackService, SNACK_TYPE } from './services/snack.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EmployersService } from './services/employers.service';

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
    constructor(
        private observer: BreakpointObserver,
        private snackService: SnackService,
        private employersService: EmployersService,
    ) {}

    @ViewChild(MatSidenav) sidenav!: MatSidenav;
    date = new Date();
    version = environment.appVersion;
    fullDateValue!: string;
    employersForm!: FormGroup;
    dayScopeValue!: string | number;
    isMobileDetected = false;
    monthScopeValue!: string | number;
    originalFormValues!: Employers;
    showEmployersLoginPage = true;
    loadingProcess = false;

    ngOnInit(): void {
        let day = this.date.getDate();
        let month = this.date.getMonth() + 1;
        let year = this.date.getFullYear();

        this.dayScopeValue = day < 10 ? '0' + day : day;
        this.monthScopeValue = month < 10 ? '0' + month : month;
        this.fullDateValue = `${this.dayScopeValue}.${this.monthScopeValue}.${year}`;
        this.employersForm = new FormGroup({
            login: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
        this.originalFormValues = this.employersForm.value;

        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            this.showEmployersLoginPage = false;
        } else {
            this.showEmployersLoginPage = true;
        }

        this.observer.observe(['(max-width: 560px)']).subscribe((isMobile) => {
            if (isMobile.matches) {
                this.isMobileDetected = true;
            } else {
                this.isMobileDetected = false;
            }
        });
    }

    ngAfterViewInit(): void {
        this.observer
            .observe(['(max-width: 900px)'])
            .pipe(delay(1), untilDestroyed(this))
            .subscribe((res) => {
                if (res.matches) {
                    this.sidenav.mode = 'over';
                    this.sidenav.close();
                } else {
                    this.sidenav.mode = 'side';
                    this.sidenav.open();
                }
            });
    }

    logEmployer() {
        const loginFormValue = this.employersForm.value;
        this.loadingProcess = true;
        this.employersService.employerLogin(loginFormValue).subscribe({
            next: (data) => {
                if (data) {
                    setTimeout(() => {
                        this.loadingProcess = false;
                        this.showEmployersLoginPage = false;

                        this.snackService.showSnackBar(
                            'SUCCESS.EMPLOYER_LOGIN',
                            SNACK_TYPE.success,
                        );
                    }, 2500);

                    sessionStorage.setItem('isLoggedIn', 'true');
                }
            },
            error: (err) => {
                setTimeout(() => {
                    this.loadingProcess = false;
                    this.showEmployersLoginPage = true;

                    this.snackService.showSnackBar(
                        'ERRORS.EMPLOYER_LOGIN_ERROR',
                        SNACK_TYPE.error,
                    );
                }, 2500);

                console.log(err);
            },
        });
    }

    logOutEmployer() {
        this.loadingProcess = true;
        this.employersService.employerLogout().subscribe({
            next: () => {
                this.employersForm.reset();
                this.loadingProcess = false;
                this.showEmployersLoginPage = true;
                sessionStorage.removeItem('isLoggedIn');
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    hasChange(): boolean | void {
        return (
            JSON.stringify(this.employersForm.value) !==
            JSON.stringify(this.originalFormValues)
        );
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter' && this.employersForm.valid) {
            this.logEmployer();
        }
    }
}
