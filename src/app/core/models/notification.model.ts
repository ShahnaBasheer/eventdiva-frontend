import { Customer } from "./customer.model";

enum NotificationType {
  MESSAGE = 'new_message',
  MISSED_CALL = 'missed_call',
  REJECTED_CALL = 'rejected_call',
  SIGNUP = 'signup',
  BOOKING_CONFIRMATION = 'booking_confirmation',
  BOOKING_UPDATE = 'booking_update',
  BOOKING_PLACED = 'booking_placed',
  BOOKING_CANCELLATION = 'booking_cancellation',
  BOOKING_REMINDER = 'booking_reminder',
  PAYMENT_SUCCESSFUL = 'payment_successful',
  PAYMENT_FAILED = 'payment_failed',
  REFUND_ISSUED = 'refund_issued',
  VENDOR_APPROVAL = 'vendor_approval',
  VENDOR_REJECTION = 'vendor_rejection',
  NEW_BOOKING_REQUEST = 'new_booking_request',
  SYSTEM_MAINTENANCE = 'system_maintenance',
  NEW_FEATURES = 'new_features',
  ACCOUNT_UPDATE = 'account_update',
  SERVICE_REGISTERED = 'service_registered',
  ADVANCE_PAYMENT = 'advance_payment',
  FULL_PAYMENT = 'full_payment',
}




interface Notification {
  _id: string;
  userId: string;  // Reference to the 'Customer' model
  userType: 'Customer'| 'Vendor' | 'Admin';
  message: string;  // Notification message
  link?: string;   // The URL for the notification link (optional if no link)
  isRead: boolean;  // Track if the notification has been read
  notificationType: NotificationType;  // Notification type (use enums from notificationTypes)
  createdAt: Date;  // Automatically handled by Mongoose timestamps
  updatedAt: Date;  // Automatically handled by Mongoose timestamps
}


export {
  Notification
};
