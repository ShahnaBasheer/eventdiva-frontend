


interface Vendor {
  serviceName?: string;
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  address?: any;
  vendorType?: 'event-planner' | 'venue-vendor' | 'photographer' | 'food-vendor';
  role?: string;
  isBlocked?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
}

export {
  Vendor
}
