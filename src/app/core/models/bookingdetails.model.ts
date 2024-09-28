



interface Payment {
  type: 'Platform Fee' | 'Advance Payment' | 'Full Payment';
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  mode: 'Razorpay'; // You can extend this if you add more payment modes
  paymentInfo: any; // Replace 'any' with a more specific type if known
  createdAt: Date;
  updatedAt: Date;
}

interface EventDate {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}






export {
  Payment,
  EventDate
}
