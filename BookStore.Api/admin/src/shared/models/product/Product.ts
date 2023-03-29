import { ProductStatus } from "shared/models/enums/ProductStatus";
import { ProductStyle } from "shared/models/enums/ProductStyle";
import { Category } from "../category/Category";
import { Designer } from "../designer/Designer";
import { ProductPicture } from "./ProductPicture";

export interface Product {
    id: string,
    creationDate: string,
    saleDate?: Date,
    isActive: boolean,
    isDeleted: boolean,
    name: string,
    type: number,
    description: string,
    color: string,
    composition?: string,
    measurements?: string,
    delivery?: string,
    modelParameters?: string,
    productParameters?: string,
    article: string,
    url: string,
    price: number,
    salePrice?: number,
    style: ProductStyle,
    status: ProductStatus,
    category?: Category,
    designer?: Designer,
    pictures?: ProductPicture[],
    code?: number,
}