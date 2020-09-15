import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  user = '';
  subUser: Subscription;
  constructor(
    private authServer: AuthService
    ) { }

  ngOnInit(): void {
    this.subUser = this.authServer.user.subscribe(userObject => {
      if (!userObject) {
        return
      }
      this.user = userObject.firstName
    }) 
  }

  ngOnDestroy() {
    if(this.subUser) {
      this.subUser.unsubscribe();
    }
  }
}
