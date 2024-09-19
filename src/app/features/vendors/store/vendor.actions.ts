import { createAction, props } from "@ngrx/store";
import { LoginCredentials } from "../../../core/models/common.model";
import { Vendor } from "../../../core/models/vendor.model";


export const vendorLogin = createAction(
  '[Vendor] Login',
  props<LoginCredentials>()
)

export const vendorLoginSuccess = createAction(
  '[Vendor] Login Success',
  props<{user: Vendor}>()
);


export const vendorLoginFailure = createAction(
  '[Vendor] Login Failure',
  props<{ error: any }>()
);


export const vendorLogOut = createAction(
  '[Vendor] Logout',
);

export const vendorSessionExpired = createAction(
  '[Vendor] Session Expired',
);


export const logOutSuccess = createAction(
  '[Vendor] Logout Success'
);

export const logOutFailure = createAction(
  '[Vendor] Logout Failure', props<{ error: any }>()
);


