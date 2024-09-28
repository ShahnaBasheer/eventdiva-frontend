import { IAddress } from "./address.model";
import { EventDate, Payment } from "./bookingdetails.model";
import { Customer } from "./customer.model";
import IEventPlanner from "./eventPlanner.model";



interface PlannerBooking {
    bookingId: string;
    eventPlannerId: IEventPlanner;
    customerId: Customer;
    eventType: string;
    eventName: string;
    isMultipleDays: boolean;
    guests: number;
    totalCost: number;
    contact: {
        email: string;
        mobile: string;
    };
    status: 'pending'| 'confirmed'| 'cancelled'| 'completed';
    address: IAddress;
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially-refunded' | 'cancelled' | 'advance';
    charges: PlannerCharges;
    reason?: string;
    additionalNeeds?: string;
    notes?: string;
    eventDate: EventDate;
    payments: Payment[];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}





interface PlannerCharges {
    platformCharge: number;
    advancePayments?: number;
    fullPayment: {
      planningFee?: number;
      servicesCharges:  {
        cost: number;
        service: string;
      }[],
    }
}




export {
    PlannerBooking,
    PlannerCharges

}
