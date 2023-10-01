import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { User } from '../models/user';

export interface NavigationObject {
    navigationId: number;
}

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
    constructor(private router: Router) {}

    user!: User;

    ngOnInit(): void {
        this.user = {} as User;
        const userURL = history.state;
        if (this.checkIfUser(userURL)) {
            this.user = userURL;
            console.log(userURL.name);
        } else {
            console.log('no user');
        }
    }

    private checkIfUser(object: User | NavigationObject): object is User {
        return Object.hasOwn(object, 'name');
    }
}
