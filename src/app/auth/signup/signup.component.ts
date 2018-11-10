import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.DoSignup({username: email, password: password}));
  }

}
