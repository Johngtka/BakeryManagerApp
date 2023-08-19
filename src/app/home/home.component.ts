import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { SnackService, SNACK_TYPE } from '../services/snack.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    ngOnInit(): void {
        // r
    }
}
