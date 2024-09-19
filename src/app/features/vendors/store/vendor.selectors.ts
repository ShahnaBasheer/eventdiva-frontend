import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VendorState } from "./vendor.state";


// Assuming CustomerState has an error property
const getvendorState = createFeatureSelector<VendorState>('vendor');

export const getError = createSelector(
  getvendorState,
  (state: VendorState) => state.error
);

export const getLoader = createSelector(
  getvendorState,
  (state: VendorState) => state.loading
);

export const getUser = createSelector(
  getvendorState,
  (state: VendorState) => state.user
)

export const isLoggedIn = createSelector(
  getvendorState,
  (state: VendorState) => state.isLoggedIn
)

export const getUserId = createSelector(
  getvendorState,
  (state: VendorState) => state.user?.id
)
