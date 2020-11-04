import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';

import * as ItemsActions from './items.actions';
import { environment } from 'src/environments/environment';
import { Item } from '../../../shared/models/item.model';

export interface ItemsResponseData {
  status: string;
  data: {
    data: Item[];
  };
}

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  getItems = this.actions$.pipe(
    ofType(ItemsActions.GET_ITEMS),
    switchMap(() => {
      return this.http.get<ItemsResponseData>(
        `${environment.domain}api/v1/items/`
      );
    }),
    map((itemsResponse) => {
      return new ItemsActions.SetItems(itemsResponse.data.data);
    })
  );
}
