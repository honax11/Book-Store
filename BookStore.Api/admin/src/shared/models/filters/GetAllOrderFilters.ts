import { ProductType } from "../category/ProductType";
import { OrderStatus } from "../enums/OrderStatus";

export interface GetAllOrderFilters {
    status: OrderStatus,
    type?: ProductType,
    categoryId?: string,
    designerId?: string,
    from?: Date,
    to?: Date
}