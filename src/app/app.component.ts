import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatSidenav } from '@angular/material/sidenav';

import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
    constructor(private observer: BreakpointObserver) {}

    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    fullDateValue!: string;

    date = new Date();
    dayScopeValue!: string | number;
    monthScopeValue!: string | number;
    isMobileDetected = false;
    version = environment.appVersion;

    ngOnInit(): void {
        this.observer.observe(['(max-width: 560px)']).subscribe((isMobile) => {
            if (isMobile.matches) {
                this.isMobileDetected = true;
            } else {
                this.isMobileDetected = false;
            }
        });

        let day = this.date.getDate();
        let month = this.date.getMonth() + 1;
        let year = this.date.getFullYear();

        this.dayScopeValue = day < 10 ? '0' + day : day;
        this.monthScopeValue = month < 10 ? '0' + month : month;
        this.fullDateValue = `${this.dayScopeValue}.${this.monthScopeValue}.${year}`;
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
}
