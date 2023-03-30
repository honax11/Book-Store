import { CustomerType } from "shared/models/enums/CustomerType";

export interface Customer {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    id: string,
    type: CustomerType
}