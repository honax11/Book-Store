import { PreOrderedProductStatus } from "shared/models/enums/PreOrderedProductStatus";
import { Product } from "../product/Product";

export interface PreOrderedProduct {
    country: string,
    city: string,
    ip: string,
    creationDate: string,
    status: PreOrderedProductStatus,
    product: Product,
}