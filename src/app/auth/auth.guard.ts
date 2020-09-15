import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

import { AuthService } from '../core/services/auth.service'
import { map } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
        ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        router: RouterStateSnapshot
        ): boolean | Promise<boolean> | Observable<boolean | UrlTree >{
            return this.authService.user.pipe(map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth'])
            }))
    }
}