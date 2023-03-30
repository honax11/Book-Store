import { ProductStatus } from "shared/models/enums/ProductStatus";
import { ProductStyle } from "shared/models/enums/ProductStyle";

export interface ProductToUpdate {
    id: string,
    isActive: boolean,
    isDeleted: boolean,
    name: string,
    type: number,
    description: string,
    color: string,
    article: string,
    url: string,
    price: number,
    salePrice?: number,
    style: ProductStyle,
    status: ProductStatus,
    categoryId: string,
    designerId: string,
    composition?: string,
    measurements?: string,
    delivery?: string,
    modelParameters?: string
    productParameters?: string,
    saleDate: Date,
    code?: number,
}