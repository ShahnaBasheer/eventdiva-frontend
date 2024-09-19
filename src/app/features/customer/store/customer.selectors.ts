
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from "./customer.state";

// Assuming CustomerState has an error property
const getCustomerState = createFeatureSelector<CustomerState>('customer');

export const getError = createSelector(
  getCustomerState,
  (state: CustomerState) => state.error
);

export const getLoader = createSelector(
  getCustomerState,
  (state: CustomerState) => state.loading
);

export const getUser = createSelector(
  getCustomerState,
  (state: CustomerState) => state.user
)

export const isLoggedIn = createSelector(
  getCustomerState,
  (state: CustomerState) => state.isLoggedIn
)


export const getToken = createSelector(
  getCustomerState,
  (state: CustomerState) => state.token
)

export const getUserId = createSelector(
  getCustomerState,
  (state: CustomerState) => state.user?.id
)
