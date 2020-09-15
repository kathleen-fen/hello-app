import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

import { User } from '../models/user.model'

@Injectable({providedIn: 'root'})

export class AuthService {
    user = new BehaviorSubject<User>(null);
    error$ = new Subject<string>();

    constructor(private dbService: NgxIndexedDBService) {}

    signIn(userData: User) {
        return this.dbService.getByIndex('users', 'email', userData.email)
        .pipe(map(data  => {
            if (data && data.password===userData.password) {
                return data
            } else {
                this.error$.next(!!data ? 'The password is incorrect!' : 'This email is not registed!');
                return null;
            }
        }),
        tap(data => {
            this.authHandle(data);
        }))
    }

    signUp(userData: User) {
        return this.dbService
        .add('users', {...userData})
        .pipe(tap(() => {this.authHandle({...userData})}))
    }

    authHandle(user: User) {
        this.user.next(user);
        if (user) {
            localStorage.setItem('user',JSON.stringify(user));
        }
        
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('user');
    }

    autoLogin() {
        let userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            return
        }
        this.authHandle(userData);
    }
}