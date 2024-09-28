import { IAddress } from "./address.model";
import { EventDate, Payment } from "./bookingdetails.model";
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

interface VenueCharges {
  platformCharge: number;
  advancePayments?: number;
  fullPayment: {
    venueRental?: number;
    servicesCharges:  {
      cost: number;
      service: string;
    }[],
  }
}

interface VenueBooking {
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
  charges: VenueCharges;
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
  VenueBooking,
  AreaBooked,
  Room,
  VenueCharges
}
