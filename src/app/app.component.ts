import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
      firebase.initializeApp({
        apiKey: 'AIzaSyDzmsG3FA557op9YvhCJ4iOZ2_iE4F7If0',
        authDomain: 'recipe-db-8ca5b.firebaseapp.com'
      });
  }
}
