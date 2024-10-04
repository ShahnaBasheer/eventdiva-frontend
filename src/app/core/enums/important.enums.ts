


enum Status {
  Pending = 'pending',
  Paid = 'paid',
  Approved = 'approved',
  Rejected = 'rejected',
  Failed = 'failed',
  Cancelled = 'cancelled',
  Refunded = 'refunded',
  Partially_Refunded = 'partially-refunded',
  Advance = 'advance',
  Confirmed = 'confirmed',
  Completed = 'completed'

}


enum UserRole {
  Admin = 'admin',
  Vendor = 'vendor',
  Customer = 'customer'
}

enum VendorType {
  EventPlanner = 'event-planner',
  VenueVendor = 'venue-vendor',
}



export
 {
    Status,
    UserRole,
    VendorType

 }
