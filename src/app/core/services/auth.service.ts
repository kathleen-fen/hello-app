import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, tap } from 'rxjs/operators'

import { User } from '../models/user.model'
import { BehaviorSubject } from 'rxjs';


@Injectable({providedIn: 'root'})

export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private dbService: NgxIndexedDBService) {}

    isAuth() {
        return !!this.user
    }

    signIn(email: string, password: string) {
        return this.dbService.getByIndex('users', 'email', email)
        .pipe(map(data  => {
            if (data && data.password===password) {
                return data
            } else return null
        }),
        tap(data => {this.user.next(data)}))
    }

    signUp(email: string, password: string, firstName: string, lastName: string) {
        return this.dbService
        .add('users', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        .pipe(tap(() => {this.user.next({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })}))
    }

    logout() {
        this.user.next(null);
    }
}