import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMComponent } from './emm.component';

describe('EMMComponent', () => {
    let component: EMMComponent;
    let fixture: ComponentFixture<EMMComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EMMComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EMMComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
