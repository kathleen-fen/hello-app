import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

import { Router } from '@angular/router'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user = '';
  constructor(
    private authServer:AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    
    this.authServer.user.subscribe(userObject => {
      if (!userObject) {
        //this.router.navigate(['/auth']);
        return
      }
      this.user = userObject.firstName
    }) 

  }

}
