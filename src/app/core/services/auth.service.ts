import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})

export class AuthService {

    constructor(private dbService: NgxIndexedDBService) {}

    signUp(email: string, password: string) {
        return this.dbService.getByIndex('users', 'email', email)
        .pipe(map(data  => {
            if (data && data.password===password) {
                return data
            } else return null
        }))
    }

    signIn(email: string, password: string, firstName: string, lastName: string) {
        
        return this.dbService
        .add('users', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        
    }

    logout() {

    }
}