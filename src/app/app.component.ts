import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../app/core/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  subUser: Subscription;
  title = 'hello-app';
  isAuth = false;
  constructor(
    private authService: AuthService,
    private router: Router
    ){
  }

  ngOnInit() {
    this.authService.autoLogin();
    this.subUser = this.authService.user.subscribe(user => {
      this.isAuth = !!user
    })
  }

  onLogout()  {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  onLogin() {
    this.router.navigate(['/auth'])
  }

  ngOnDestroy() {
    if (this.subUser) {
      this.subUser.unsubscribe();
    }
  }
}
