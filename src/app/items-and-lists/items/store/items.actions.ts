import { Action } from '@ngrx/store';
import { Item } from '../../../shared/models/item.model';

export const SET_ITEMS = '[ITEMS] Set items';
export const GET_ITEMS = '[ITEMS] Get items';
export const SELECT_ITEM = '[ITEMS] Select item';
export const DESELECT_ITEM = '[ITEMS] Deselect item';

export class SetItems implements Action {
  readonly type = SET_ITEMS;
  constructor(public payload: Item[]) {}
}

export class GetItems implements Action {
  readonly type = GET_ITEMS;
}

export class SelectItem implements Action {
  readonly type = SELECT_ITEM;
  constructor(public payload: Item) {}
}

export class DeselectItem implements Action {
  readonly type = SELECT_ITEM;
  constructor(public payload: Item) {}
}

export type ItemsActions = SetItems | GetItems;
