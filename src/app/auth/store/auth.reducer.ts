import { User } from 'src/app/shared/models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
}

const initialState: State = {
  user: null,
  authError: null,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
      };
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.id,
        action.payload.name,
        action.payload.email,
        action.payload.role,
        action.payload.photo,
        action.payload.shoppingLists,
        action.payload.token
      );
      return {
        ...state,
        user,
        authError: null,
        //loading: false,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
