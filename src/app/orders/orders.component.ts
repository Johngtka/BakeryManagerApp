import { Component, OnInit } from '@angular/core';

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
    constructor() {}

    user!: User;

    ngOnInit(): void {
        this.user = {} as User;
        const userURL = history.state;
        if (this.checkIfUserExist(userURL)) {
            this.user = userURL;
            console.log(userURL.name);
        } else {
            console.log('no user');
        }
    }

    private checkIfUserExist(object: User | NavigationObject): object is User {
        return Object.hasOwn(object, 'name');
    }
}
