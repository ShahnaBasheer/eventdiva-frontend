



interface Customer {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  role?: string;
  address?: any;
  favorites?: string[];
  bookings?: string[];
  isBlocked?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
}



export {
  Customer
}
