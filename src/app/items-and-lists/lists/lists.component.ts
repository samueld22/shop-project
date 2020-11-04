import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as ShoppingListsActions from '../../shared/shopping-list-store/shopping-lists.actions';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  namesAndIds: { id: string; name: string }[];
  private listSub: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
    this.store.dispatch(new ShoppingListsActions.GetShoppingLists());
    this.listSub = this.store.select('lists').subscribe((listData) => {
      if (listData.shoppingLists) {
        this.namesAndIds = listData.shoppingLists.map((el) => {
          return { id: el._id, name: el.name };
        });
      }
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.listSub.unsubscribe();
  }
}
