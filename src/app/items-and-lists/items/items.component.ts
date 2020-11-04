import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Item } from '../../shared/models/item.model';
import * as ItemsActions from './store/items.actions';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit, OnDestroy {
  items: Item[];
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  onGet() {}

  ngOnInit(): void {
    this.store.dispatch(new ItemsActions.GetItems());
    this.subscription = this.store
      .select('items')
      .pipe(
        map((itemsState) => {
          return itemsState.items;
        })
      )
      .subscribe((items: Item[]) => {
        this.items = items;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
