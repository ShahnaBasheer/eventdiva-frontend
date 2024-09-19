import { IAddress } from "./address.model";


interface IRoom {
    count: number;
    roomStartingPrice: number;
}


interface IAvailableDate {
    startDate: Date;
    endDate: Date;
}

interface IPlatePrice {
    vegPerPlate?: number;
    nonVegPerPlate?: number;
}

interface ICapacity {
    areaType: string;
    areaName: string;
    seats: number;
    floats: number;
}


interface IVenue {
    vendorId: string;
    slug: string;
    venueName: string;
    venueType: string;
    startYear: number;
    contact: {
        email: string;
        mobile: string;
    };
    address: IAddress;
    description: string;
    amenities: string[];
    rooms: IRoom;
    rent?: number;
    coverPic: string;
    services: string[];
    platePrice?: IPlatePrice;
    decorStartingPrice?: number;
    availableDates: IAvailableDate[];
    capacity: ICapacity[];
    portfolios: string[];
    rating: number;
    reviews?: string[];
    albums?: string[];
    bookings?: string[];
    document?: string;
    approval: 'approved' | 'pending' | 'rejected';
    isDeleted?: boolean,
    createdAt?: Date;
    updatedAt?: Date;
}



export {
    IVenue,
    IPlatePrice,
    ICapacity,
    IRoom,
    IAvailableDate
};
