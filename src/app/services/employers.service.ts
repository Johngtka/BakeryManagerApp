import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Employers } from '../models/employers';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EmployersService {
    constructor() {}
}
