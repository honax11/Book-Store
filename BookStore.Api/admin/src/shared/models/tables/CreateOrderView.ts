import { OrderStatus } from "shared/models/enums/OrderStatus";

export interface CreateOrderView {
    id: string,
    adminComment: string,
    status: OrderStatus
}