import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  status: 'success' | 'fail';
  token: string;
  data: {
    data: {
      photo: string;
      role: 'user' | 'admin';
      shoppingLists: string[];
      _id: string;
      name: string;
      email: string;
      __v: 0;
    };
  };
}

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occured!';
  if (!errorRes.error || !errorRes.error.message) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  errorMessage = errorRes.error.message;

  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(`${environment.domain}api/v1/users/login`, {
          email: authData.payload.email,
          password: authData.payload.password,
        })
        .pipe(
          map((resData) => {
            const resUserData = resData.data.data;
            const user = new User(
              resUserData._id,
              resUserData.name,
              resUserData.email,
              resUserData.role,
              resUserData.photo,
              resUserData.shoppingLists,
              resData.token
            );
            localStorage.setItem('userData', JSON.stringify(user));

            return new AuthActions.AuthenticateSuccess({
              token: resData.token,
              id: resUserData._id,
              name: resUserData.name,
              email: resUserData.email,
              role: resUserData.role,
              photo: resUserData.photo,
              shoppingLists: resUserData.shoppingLists,
              redirect: true,
            });
          }),
          catchError((errorRes) => handleError(errorRes))
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }
      const loadedUser = new User(
        userData.id,
        userData.name,
        userData.email,
        userData.role,
        userData.photo,
        userData.shoppingLists,
        userData.token
      );

      if (userData.token) {
        return new AuthActions.AuthenticateSuccess({
          token: loadedUser.token,
          id: loadedUser.id,
          name: loadedUser.name,
          email: loadedUser.email,
          role: loadedUser.role,
          photo: loadedUser.photo,
          shoppingLists: loadedUser.shoppingLists,
          redirect: false,
        });
      }
      return { type: 'DUMMY' };
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authAction: AuthActions.AuthenticateSuccess) => {
      if (authAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );
}
