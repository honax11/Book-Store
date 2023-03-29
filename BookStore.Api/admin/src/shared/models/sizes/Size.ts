import { ProductType } from "../category/ProductType";

export interface Size {
    id: string,
    creationDate: string,
    isActive: boolean,
    isDeleted: boolean,
    name: string,
    type: ProductType,
    order?: number
}