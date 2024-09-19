import { IAddress } from "./address.model";
import { Customer } from "./customer.model";
import { IVenue } from "./venue.model";



interface Room {
  count: number;
  totalPrice: number;
}

interface AreaBooked {
  areaType: 'indoor'| 'outdoor'| 'indoor & outdoor';
  areaName: string;
}

interface Service {
  cost: number;
  service: string;
}

interface Charges {
  platformCharge: number;
  advancePayments?: number;
  venueRental?: number;
  servicesChrges?: Service[],
  additionalFees?: any;
}

interface EventDate {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}

interface Payment {
  type: 'Platform Fee'| 'Advance Payment'| 'Full Payment'
  amount: number;
  date: string;
  status: string;
  mode: string;
  createdAt: Date;
  updatedAt: Date;
  paymentInfo: any; // Adjust as per structure
}

interface IVenueBooking {
  bookingId: string;
  venueId: IVenue;
  customerId: Customer;
  rooms: Room;
  days: number;
  areasBooked?: AreaBooked[];
  eventType: string;
  eventName: string;
  isMultipleDays: boolean;
  servicesRequested: string[];
  guests: number;
  totalCost: number;
  contact: {
      email: string;
      mobile: string;
  };
  status: string;
  address: IAddress;
  paymentStatus: string;
  charges: Charges;
  reason?: string;
  additionalNeeds?: string;
  notes?: string;
  eventDate: EventDate;
  payments: Payment[];
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}



export {
  IVenueBooking,
  Payment,
  Charges,
  AreaBooked,
  Room,
  EventDate
}
