import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user = '';
  constructor(private authServer:AuthService) { }

  ngOnInit(): void {
    
    this.authServer.user.subscribe(userObject => {
      this.user = userObject.firstName
    }) 

  }

}
