import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => this.token = token)
        this.router.navigate(['/recipes']);
      })
      .catch(error => console.log(error));
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => this.token = token);
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/signin']);
  }

}
