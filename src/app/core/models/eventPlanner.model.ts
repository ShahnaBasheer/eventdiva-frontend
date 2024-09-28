

type EventServiceOption =
    | "All Events"
    | "Wedding Events"
    | "Corporate Events"
    | "Social Events"
    | "Themed Parties"
    | "Destination Events"
    | "Festivals"
    | "Concerts and Live Performances"
    | "Trade Shows and Exhibitions"
    | "Fundraisers and Charity Events"
    | "Conferences and Seminars"
    | "Product Launches"
    | "Award Ceremonies"
    | "Birthday Parties"
    | "Anniversaries"
    | "Sporting Events"
    | "Community Events"
    | "School and University Events"
    | "Religious Celebrations"
    | "Holiday Parties"
    | "General Event Planning";



interface IEventPlanner{
    slug: string;
    vendorId: string;
    contact: {
        email: string;
        mobile: string;
    };
    website?: string;
    company: string;
    startYear: number;
    services?: EventServiceOption[];
    description: string;
    coverPic: string;
    portfolios: string[];
    document: string;
    reviews?: any[];
    albums?: any [];
    bookings?: any [];
    rating: number;
    planningFee: {
        minPrice: number;
        maxPrice: number;
    };
    address?: any;
    plannedCities: string[];
    approval: "approved"| "pending"| "rejected";
    isDeleted?: boolean,
    createdAt?: Date;
    updatedAt?: Date;
}


export default IEventPlanner;
