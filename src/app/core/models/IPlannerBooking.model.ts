import { IAddress } from "./address.model";
import { Customer } from "./customer.model";
import IEventPlanner from "./eventPlanner.model";



interface IPlannerBooking {
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


interface EventDate {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
}

interface Service {
    cost: number;
    service: string;
}

interface Charges {
    platformCharge: number;
    planningFee?: number;
    advancePayments?: number;
    servicesCharges?: Service[],
    additionalFees?: any;
}

interface Payment {
    type: 'Platform Fee' | 'Advance Payment' | 'Full Payment';
    amount: number;
    status: 'pending' | 'paid' | 'failed' | 'cancelled';
    mode: 'Razorpay'; // You can extend this if you add more payment modes
    paymentInfo: any; // Replace 'any' with a more specific type if known
    createdAt: Date;
    updatedAt: Date;
}



export {
    IPlannerBooking,
    Payment,
    Charges,
    EventDate

}
