import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInputDialogComponent } from './product-input-dialog.component';

describe('ProductInputDialogComponent', () => {
    let component: ProductInputDialogComponent;
    let fixture: ComponentFixture<ProductInputDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProductInputDialogComponent],
        });
        fixture = TestBed.createComponent(ProductInputDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
