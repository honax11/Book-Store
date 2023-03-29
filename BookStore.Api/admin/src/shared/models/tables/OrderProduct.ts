import { Product } from "../product/Product"
import { ProductSizes } from "./ProductSizes"

export interface OrderProduct {
    id: string,
    creationDate: string,
    isActive: boolean,
    isDeleted: boolean,
    product: Product
    quantity: number,
    sizeId: string,
    productSize: ProductSizes
}