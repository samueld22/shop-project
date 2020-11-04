import { ActionReducerMap } from '@ngrx/store';
import * as fromItems from '../items-and-lists/items/store/items.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromLists from '../shared/shopping-list-store/shopping-lists.reducer';

export interface AppState {
  items: fromItems.State;
  auth: fromAuth.State;
  lists: fromLists.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  items: fromItems.itemReducer,
  auth: fromAuth.authReducer,
  lists: fromLists.shoppingListReducer,
};
