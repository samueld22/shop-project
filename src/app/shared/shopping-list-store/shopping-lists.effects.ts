import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as ShoppingListsActions from './shopping-lists.actions';
import * as fromApp from '../../store/app.reducer';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';
import { of } from 'rxjs';

export interface ShoppingListsResponseData {
  status: 'success' | 'fail';
  data: {
    data: {
      name: string;
      items: string[];
      totalPrice: number;
      createdAt: Date;
      _id: string;
      user: string;
    }[];
  };
}

export interface SelectedListResponseData {
  status: 'success' | 'fail';
  data: {
    data: {
      items: Item[];
      totalPrice: number;
      createdAt: Date;
      _id: string;
      user: string;
      name: string;
    };
  };
}

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occured!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new ShoppingListsActions.Error(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'Email does not exist!';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'Password is invalid!';
      break;
  }
  //errorMessage = errorRes.
  return of(new ShoppingListsActions.Error(errorMessage));
};

@Injectable()
export class ShoppingListsEffects {
  token: string;
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  @Effect()
  getLists = this.actions$.pipe(
    ofType(ShoppingListsActions.GET_SHOPPING_LISTS),
    tap(() => {
      this.store.select('auth').subscribe((authState) => {
        this.token = authState.user.token;
      });
    }),
    switchMap(() => {
      return this.http.get<ShoppingListsResponseData>(
        `${environment.domain}api/v1/shoppingLists`,
        {
          headers: { cookie: `${this.token}` },
        }
      );
    }),
    map((listResData) => {
      return new ShoppingListsActions.SetShoppingLists(listResData.data.data);
    })
  );

  @Effect()
  getOneList = this.actions$.pipe(
    ofType(ShoppingListsActions.GET_ONE_SHOPPING_LIST),
    tap(() => {
      this.store.select('auth').subscribe((authState) => {
        this.token = authState.user.token;
      });
    }),
    switchMap((idData: ShoppingListsActions.GetOneShoppingList) => {
      return this.http.get<SelectedListResponseData>(
        `${environment.domain}api/v1/shoppingLists/${idData.payload}`,
        {
          headers: { cookie: `${this.token}` },
        }
      );
    }),
    map((listResData) => {
      return new ShoppingListsActions.SelectShoppingList(listResData.data.data);
    }),
    catchError((errorRes) => {
      console.log(errorRes);
      return 'DUMMY'; //handleError(errorRes);
    })
  );

  @Effect()
  renameList = this.actions$.pipe(
    ofType(ShoppingListsActions.RENAME_SHOPPING_LIST),
    tap(() => {
      this.store.select('auth').subscribe((authState) => {
        this.token = authState.user.token;
      });
    }),
    switchMap((reqData: ShoppingListsActions.RenameShoppingList) => {
      return this.http.patch<SelectedListResponseData>(
        `${environment.domain}api/v1/shoppingLists/${reqData.payload.id}/rename`,
        { name: reqData.payload.newName },
        {
          headers: { cookie: `${this.token}` },
        }
      );
    }),
    map((listResData) => {
      return new ShoppingListsActions.AfterRenameList(
        listResData.data.data.name
      );
    })
  );

  @Effect()
  deleteList = this.actions$.pipe(
    ofType(ShoppingListsActions.DELETE_SHOPPING_LIST),
    tap(() => {
      this.store.select('auth').subscribe((authState) => {
        this.token = authState.user.token;
      });
    }),
    switchMap((reqData: ShoppingListsActions.RenameShoppingList) => {
      return this.http.delete(
        `${environment.domain}api/v1/shoppingLists/${reqData.payload}`,
        {
          headers: { cookie: `${this.token}` },
        }
      );
    }),
    map((listResData) => {
      return new ShoppingListsActions.AfterDeleteList();
    })
  );
}
