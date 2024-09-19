

import { Admin } from "../../../core/models/admin.model";


export interface AdminState {
  user: Admin | null;
  error: string | null;
  loading: boolean;
  isLoggedIn: boolean;
}

export const initialState: AdminState = {
  user: null,
  error: null,
  loading: false,
  isLoggedIn: false,

};
