import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import * as ShoppingListsActions from '../../../shared/shopping-list-store/shopping-lists.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnChanges {
  @Input() id: string;
  @Input() name: string;
  @Input() index: number;

  isSelected: boolean;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  onSelect() {
    this.store.dispatch(new ShoppingListsActions.GetOneShoppingList(this.id));
    this.isSelected = true;
    console.log('Selected');
  }

  onDelete() {
    this.store.dispatch(new ShoppingListsActions.DeleteShoppingList(this.id));
  }

  ngOnChanges(): void {
    // this.subscription = this.store.select('lists').subscribe((listsState) => {
    //   if (listsState.selectedList) {
    //     console.log(listsState.selectedList._id, this.id);
    //     if (this.id === listsState.selectedList._id) {
    //       this.isSelected === true;
    //     } else {
    //       this.isSelected === false;
    //     }
    //   }
    // });
    // this.subscription.unsubscribe();
  }
}
