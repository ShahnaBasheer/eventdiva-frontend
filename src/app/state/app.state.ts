import { Admin } from "../core/models/admin.model";
import { Customer } from "../core/models/customer.model";
import { adminReducer } from "../features/admin/store/admin.reducers";
import { AdminState } from "../features/admin/store/admin.state";
import { customerReducer } from "../features/customer/store/customer.reducers";
import { CustomerState } from "../features/customer/store/customer.state";
import { vendorReducer } from "../features/vendors/store/vendor.reducers";
import { VendorState } from "../features/vendors/store/vendor.state";



export interface AppState {
  customer: CustomerState,
  vendor: VendorState,
  admin: AdminState,
}


export const appReducer = {
  customer: customerReducer,
  admin: adminReducer,
  vendor: vendorReducer,
}

