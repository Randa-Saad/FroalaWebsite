import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment-timezone';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  
  constructor(firestore: AngularFirestore){
    this.items = firestore.collection('items').valueChanges();
  }
  title = 'FroalaApp';
   a = moment.utc("2013-11-18 11:55").tz("Asia/Taipei");
   b = moment.utc("2013-11-18 11:55").tz("America/Toronto");

awithformaat= this.a.format(); // 2013-11-18T19:55:00+08:00
bwithformat= this.b.format(); // 2013-11-18T06:55:00-05:00

aautcformat =this.a.utc().format(); // 2013-11-18T11:55Z
bautcformat =this.b.utc().format(); // 2013-11-18T11:55Z

}
