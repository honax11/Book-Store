import { ProductType } from "../category/ProductType";
import { ClickType } from "../enums/ClickType";

export interface Click {
    country: string,
    city: string,
    ip: string,
    name: string,
    productType: ProductType,
    type: ClickType,
    creationDate: string,
}