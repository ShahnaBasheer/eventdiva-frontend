import { createReducer, on } from "@ngrx/store";
import { initialState } from "./vendor.state";
import * as VendorActions from './vendor.actions';



export const vendorReducer = createReducer(
  initialState,
  on(VendorActions.vendorLogin, state => ({ ...state, loading: true, error: null})),
  on(VendorActions.vendorLoginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
    isLoggedIn: true
  })),
  on(VendorActions.vendorLoginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isLoggedIn: false,
  })),
  on(VendorActions.logOutSuccess, (state) => ({ ...state, user: null, isLoggedIn: false })),
  on(VendorActions.logOutFailure, (state, { error }) => ({ ...state, error }))
)
