import { ProductSizeItem } from "./ProductSizeItem";

export interface ProductSize {
    id?: string,
    productId: string,
    sizes: ProductSizeItem[]
}