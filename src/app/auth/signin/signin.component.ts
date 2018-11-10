import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    this.store.dispatch(new AuthActions.DoSignin({username: form.value.email, password: form.value.password}));
  }
}
