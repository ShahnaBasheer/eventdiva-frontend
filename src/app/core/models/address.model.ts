
interface IAddress {
    building: string;
    street: string;
    city: string;
    town?: string;
    district: string;
    state: string;
    landmark?: string;
    pincode: number;
    createdAt?: Date;
    updatedAt?: Date;

}

export {
  IAddress
}
