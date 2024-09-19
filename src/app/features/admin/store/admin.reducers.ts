import { createReducer, on } from "@ngrx/store";
import { initialState } from "./admin.state";
import * as AdminActions from './admin.actions';

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.userLogin, state => ({ ...state, loading: true, error: null})),
  on(AdminActions.adminLoginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
    isLoggedIn: true
  })),
  on(AdminActions.adminLoginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isLoggedIn: false,
  })),
  on(AdminActions.logOutSuccess, (state) => ({ ...state, user: null, isLoggedIn: false })),
  on(AdminActions.logOutFailure, (state, { error }) => ({ ...state, error }))
)
