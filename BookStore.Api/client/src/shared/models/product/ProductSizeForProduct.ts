import { Size } from "../sizes/Size";

export interface ProductSizeForProduct {
    id: string,
    size: Size,
    quantity: number,
    isActive: boolean,
}