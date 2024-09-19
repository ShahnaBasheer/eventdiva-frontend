import { Vendor } from "../../../core/models/vendor.model";


export interface VendorState {
  user: Vendor | null;
  error: string | null;
  loading: boolean;
  isLoggedIn: boolean;
}

export const initialState: VendorState = {
  user: null,
  error: null,
  loading: false,
  isLoggedIn: false
};
