import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInputDialogComponent } from './update-input-dialog.component';

describe('UpdateInputDialogComponent', () => {
    let component: UpdateInputDialogComponent;
    let fixture: ComponentFixture<UpdateInputDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UpdateInputDialogComponent],
        });
        fixture = TestBed.createComponent(UpdateInputDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
