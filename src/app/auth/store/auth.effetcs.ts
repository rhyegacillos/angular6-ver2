import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthEffetcs {

  constructor(private actions$: Actions, private router: Router) {}

  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.DO_SIGNUP)
    .pipe(
      map(
        (action: AuthActions.DoSignup) => {
          return action.payload;
        }),
      switchMap(
        (authData: {username: string, password: string}) => {
          return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        }
      ),
      switchMap(
        () => {
          return fromPromise(firebase.auth().currentUser.getIdToken());
        }
      ),
      mergeMap(
        (token: string) => {
          return [
            {
              type: AuthActions.SIGNUP
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token
            }
          ];
        }
      )
    );

  @Effect()
  authSigin = this.actions$
    .ofType(AuthActions.DO_SIGNIN)
    .pipe(
      map(
        (action: AuthActions.DoSignin) => {
          return action.payload;
        }),
      switchMap(
        (authData: {username: string, password: string}) => {
          return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        }
      ),
      switchMap(
        () => {
          return fromPromise(firebase.auth().currentUser.getIdToken());
        }
      ),
      mergeMap(
        (token: string) => {
          this.router.navigate(['/']);
          return [
            {
              type: AuthActions.SIGNIN
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token
            }
          ];
        }
      )
    );

  @Effect({dispatch: false})
  authLogut = this.actions$
    .ofType(AuthActions.LOGOUT)
    .pipe(
      tap(
        () => this.router.navigate(['/'])
      )
    );
}
