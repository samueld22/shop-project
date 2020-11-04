import { Item } from '../../../shared/models/item.model';
import * as ItemsActions from './items.actions';

export interface State {
  items: Item[];
}

const initialState: State = {
  items: [],
};

export function itemReducer(
  state = initialState,
  action: ItemsActions.ItemsActions
) {
  switch (action.type) {
    case ItemsActions.SET_ITEMS:
      return {
        ...state,
        items: [...action.payload],
      };

    default:
      return state;
  }
}
