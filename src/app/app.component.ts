import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

import { AuthService } from '../app/core/services/auth.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'hello-app';
  
  constructor(
    private dbService: NgxIndexedDBService,
    private authService: AuthService
    ){
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
  
 //temporary part 
  putData() {
    this.dbService
  .add('users', {
    firstName: `Bruce`,
    lastName: `Wayne`,
    email: `bruce@wayne.com`,
    password: `111111`
  })
  .subscribe((key) => {
    console.log('key: ', key);
  });
  }

  getData() {
    /* this.dbService.getByKey('people', 1).subscribe((people) => {
      console.log(people);
    },); */
    this.dbService.getAll('users').subscribe((peoples) => {
      console.log(peoples);
    });
    /* this.dbService.getByIndex('users', 'email', 'bruce@wayne.com').subscribe((people) => {
      console.log(people);
    }); */
  }
}
