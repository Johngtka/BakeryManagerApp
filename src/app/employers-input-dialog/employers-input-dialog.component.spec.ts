import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployersInputDialogComponent } from './employers-input-dialog.component';

describe('EmployersInputDialogComponent', () => {
    let component: EmployersInputDialogComponent;
    let fixture: ComponentFixture<EmployersInputDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployersInputDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EmployersInputDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
