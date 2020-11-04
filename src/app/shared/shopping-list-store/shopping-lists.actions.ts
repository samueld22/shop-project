import { Action } from '@ngrx/store';
import { ShoppingListArrayElement } from '../models/shopping-list-array-element.model';
import { ShoppingList } from '../models/shopping-list.model';

export const GET_SHOPPING_LISTS = '[Shopping-lists] Get shopping lists';
export const GET_ONE_SHOPPING_LIST = '[Shopping-lists] Get one shopping list';
export const SET_SHOPPING_LISTS = '[Shopping-lists] Set shopping lists';
export const SELECT_SHOPPING_LIST = '[Shopping-lists] Select shopping list';
export const RENAME_SHOPPING_LIST = '[Shopping-lists] Rename shopping list';
export const AFTER_RENAME_LIST = '[Shopping-lists] After rename shopping list';
export const DELETE_SHOPPING_LIST = '[Shopping-list] Delete shopping list';
export const AFTER_DELETE_LIST = '[Shopping-lists] After delete shopping list';
export const ERROR = '[Shopping-lists] Error';

export class GetShoppingLists implements Action {
  readonly type = GET_SHOPPING_LISTS;
}

export class GetOneShoppingList implements Action {
  readonly type = GET_ONE_SHOPPING_LIST;
  constructor(public payload: string) {}
}

export class SetShoppingLists implements Action {
  readonly type = SET_SHOPPING_LISTS;
  constructor(public payload: ShoppingListArrayElement[]) {}
}

export class SelectShoppingList implements Action {
  readonly type = SELECT_SHOPPING_LIST;
  constructor(public payload: ShoppingList) {}
}

export class RenameShoppingList implements Action {
  readonly type = RENAME_SHOPPING_LIST;
  constructor(public payload: { id: string; newName: string }) {}
}

export class DeleteShoppingList implements Action {
  readonly type = DELETE_SHOPPING_LIST;
  constructor(public payload: string) {}
}

export class AfterRenameList implements Action {
  readonly type = AFTER_RENAME_LIST;
  constructor(public payload: string) {}
}

export class AfterDeleteList implements Action {
  readonly type = AFTER_DELETE_LIST;
}

export class Error implements Action {
  readonly type = ERROR;
  constructor(public payload: string) {}
}

export type ShoppingListsActions =
  | GetShoppingLists
  | SetShoppingLists
  | GetOneShoppingList
  | SelectShoppingList
  | RenameShoppingList
  | DeleteShoppingList
  | AfterRenameList
  | AfterDeleteList
  | Error;
