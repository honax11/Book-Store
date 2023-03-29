import { ProductType } from "./ProductType";

export interface Category {
    id: string,
    creationDate: string,
    isActive: boolean,
    isDeleted: boolean,
    name: string,
    url: string,
    title?: string,
    description?: string,
    type: ProductType,
}