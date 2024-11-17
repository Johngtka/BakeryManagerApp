import { TestBed } from '@angular/core/testing';

import { EmployersService } from './employers.service';

describe('EmployersService', () => {
    let service: EmployersService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EmployersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
