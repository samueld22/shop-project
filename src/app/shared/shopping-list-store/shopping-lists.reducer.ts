import { Actions } from '@ngrx/effects';
import { User } from 'src/app/shared/models/user.model';
import { ShoppingListArrayElement } from '../models/shopping-list-array-element.model';
import { ShoppingList } from '../models/shopping-list.model';
import * as ShoppingListsActions from './shopping-lists.actions';

export interface State {
  shoppingLists: ShoppingListArrayElement[];
  selectedList: ShoppingList;
  errorMessage: null;
}

const initialState: State = {
  shoppingLists: null,
  selectedList: null,
  errorMessage: null,
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListsActions.ShoppingListsActions
) {
  switch (action.type) {
    case ShoppingListsActions.SET_SHOPPING_LISTS:
      return {
        ...state,
        shoppingLists: [...action.payload],
      };
    case ShoppingListsActions.SELECT_SHOPPING_LIST:
      return {
        ...state,
        selectedList: { ...action.payload },
      };
    case ShoppingListsActions.AFTER_DELETE_LIST:
      const deleteListIndex = state.shoppingLists.findIndex((el) => {
        return el._id === state.selectedList._id;
      });
      const updatedShoppingListsDelete = [...state.shoppingLists];
      updatedShoppingListsDelete.splice(deleteListIndex, 1);
      console.log(updatedShoppingListsDelete);
      return {
        ...state,
        selectedList: null,
        shoppingLists: updatedShoppingListsDelete,
      };
    case ShoppingListsActions.AFTER_RENAME_LIST:
      const listIndex = state.shoppingLists.findIndex((el) => {
        return el._id === state.selectedList._id;
      });
      const updatedShoppingList = { ...state.shoppingLists[listIndex] };
      updatedShoppingList.name = action.payload;

      const updatedShoppingLists = [...state.shoppingLists];
      updatedShoppingLists[listIndex] = updatedShoppingList;

      const updatedSelectedList = { ...state.selectedList };
      updatedSelectedList.name = action.payload;

      return {
        ...state,
        selectedList: updatedSelectedList,
        shoppingLists: updatedShoppingLists,
      };
    default:
      return state;
  }
}
