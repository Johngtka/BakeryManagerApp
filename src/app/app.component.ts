import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatSidenav } from '@angular/material/sidenav';

import { delay } from 'rxjs/operators';
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

    date = new Date();
    isMobileDetected = false;

    ngOnInit(): void {
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
}
