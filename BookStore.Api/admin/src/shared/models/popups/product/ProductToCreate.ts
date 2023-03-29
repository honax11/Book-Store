import { ProductStatus } from "shared/models/enums/ProductStatus";
import { ProductStyle } from "shared/models/enums/ProductStyle";

export interface ProductToCreate {
    name: string,
    type: Number,
    description: string,
    color: string,
    article: string,
    url: string,
    price: number,
    style: ProductStyle,
    status: ProductStatus,
    designerId: string,
    categoryId: string,
    composition: string,
    measurements: string,
    delivery: string,
    modelParameters: string,
    productParameters?: string,
    code?: number,
}