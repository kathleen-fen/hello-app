import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private dbService: NgxIndexedDBService){
  }
  title = 'hello-app';

  putData() {
    this.dbService
  .add('people', {
    name: `Bruce Wayne`,
    email: `bruce@wayne.com`,
  })
  .subscribe((key) => {
    console.log('key: ', key);
  });
  }

  getData() {
    /* this.dbService.getByKey('people', 1).subscribe((people) => {
      console.log(people);
    },); */
    /* this.dbService.getAll('people').subscribe((peoples) => {
      console.log(peoples);
    }); */
    this.dbService.getByIndex('people', 'name', 'Bruce Wayne').subscribe((people) => {
      console.log(people);
    });
  }
}
