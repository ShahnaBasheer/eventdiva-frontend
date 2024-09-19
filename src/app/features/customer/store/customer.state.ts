import { Customer } from "../../../core/models/customer.model";


export interface CustomerState {
  user: Customer | null;
  error: string | null;
  loading: boolean;
  isLoggedIn: boolean;
  token: string | null;
}

export const initialState: CustomerState = {
  user: null,
  error: null,
  loading: false,
  isLoggedIn: false,
  token: null,
};
