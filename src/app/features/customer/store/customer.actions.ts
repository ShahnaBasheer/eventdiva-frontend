import { createAction, props } from "@ngrx/store";
import { Customer } from "../../../core/models/customer.model";
import { LoginCredentials } from "../../../core/models/common.model";


export const userLogin = createAction(
  '[User] Login',
  props<LoginCredentials>()
)

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{user: Customer, token: string}>()
);


export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: any }>()
);


export const googleSignin = createAction(
  '[User] GoogleSignin',
  props<{ token: string }>()
);

export const logOut = createAction(
  '[User] Logout',
);

export const sessionExpired = createAction(
  '[User] Session Expired',
);

export const logOutSuccess = createAction(
  '[User] Logout Success'
);

export const logOutFailure = createAction(
  '[User] Logout Failure', props<{ error: any }>()
);

export const videoCallRoomId = createAction(
  '[RoomId] Vendor', props<{roomId: string}>()
);
