

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from "./admin.state";


// Assuming CustomerState has an error property
const getAdminState = createFeatureSelector<AdminState>('admin');

export const getError = createSelector(
  getAdminState,
  (state: AdminState) => state.error
);

export const getLoader = createSelector(
  getAdminState,
  (state: AdminState) => state.loading
);

export const getUser = createSelector(
  getAdminState,
  (state: AdminState) => state.user
)

export const isLogged = createSelector(
  getAdminState,
  (state: AdminState) => state.isLoggedIn
)
