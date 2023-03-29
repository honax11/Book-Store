import { OrderProductView } from "./OrderProductView"
import { PaymentType } from "./PaymentType"

export interface OrderToCreate {
    city: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    house: string,
    totalPrice: number,
    street: string,
    appartment: string,
    comment: string,
    callBack: boolean,
    paymentType: PaymentType,
    country: string,
    novaPoshta?: string
    orderProducts: OrderProductView[]
}