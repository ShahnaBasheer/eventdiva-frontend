import { createAction, props } from "@ngrx/store";
import { Admin } from "../../../core/models/admin.model";
import { LoginCredentials } from "../../../core/models/common.model";


export const userLogin = createAction(
  '[Admin] Login',
  props<LoginCredentials>()
)

export const adminLoginSuccess = createAction(
  '[Admin] Login Success',
  props<{user: Admin}>()
);


export const adminLoginFailure = createAction(
  '[Admin] Login Failure',
  props<{ error: any }>()
);


export const adminLogOut = createAction(
  '[Admin] Logout',
);


export const adminSessionExpired = createAction(
  '[Admin] Session Expired',
);


export const logOutSuccess = createAction(
  '[Admin] Logout Success'
);

export const logOutFailure = createAction(
  '[Admin] Logout Failure', props<{ error: any }>()
);



