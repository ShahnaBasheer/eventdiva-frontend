import { Customer } from "./customer.model";




interface Chatroom {
    _id?: string;
    vendorId: string;
    customerId: Customer;
    messages: Message[];
    createdAt?: Date;
    updatedAt?: Date;
}


// Interface for a single message in the chatroom
 interface Message {
    _id?: string;
    id: string;
    senderId: string;
    senderType: 'vendor' | 'customer';
    content: string;
    isRead: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}




export {
    Chatroom,
    Message
};


