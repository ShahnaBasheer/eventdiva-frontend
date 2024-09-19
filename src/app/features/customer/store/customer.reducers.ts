import { createReducer, on } from "@ngrx/store";
import { initialState } from "./customer.state";
import * as CustomerActions from './customer.actions';


export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.userLogin, state => ({ ...state, loading: true, error: null})),
  on(CustomerActions.googleSignin, state => ({ ...state, error: null})),
  on(CustomerActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null,
    isLoggedIn: true,
  })),
  on(CustomerActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isLoggedIn: false
  })),
  on(CustomerActions.logOutSuccess, (state) => ({ ...state, user: null, isLoggedIn: false, token: null })),
  on(CustomerActions.logOutFailure, (state, { error }) => ({ ...state, error })),
)
