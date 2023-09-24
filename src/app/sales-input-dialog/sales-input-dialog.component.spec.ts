import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInputDialogComponent } from './sales-input-dialog.component';

describe('SalesInputDialogComponent', () => {
    let component: SalesInputDialogComponent;
    let fixture: ComponentFixture<SalesInputDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SalesInputDialogComponent],
        });
        fixture = TestBed.createComponent(SalesInputDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
