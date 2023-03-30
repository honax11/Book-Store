import { PaymentType } from "shared/models/check-out/PaymentType";
import { OrderStatus } from "shared/models/enums/OrderStatus";
import { CustomerUser } from "./CustomerUser";
import { OrderLocation } from "./OrderLocation";
import { OrderProduct } from "./OrderProduct";

export interface OrderToView {
    id: string,
    orderNumber: number,
    creationDate: string,
    isActive: boolean,
    isDeleted: boolean,
    userId: string,
    callBack: boolean,
    adminComment:string,
    comment: string,
    totalPrice: number,
    status: OrderStatus,
    orderLocation: OrderLocation,
    customerUser: CustomerUser,
    payType: PaymentType,
    products: OrderProduct[]
}