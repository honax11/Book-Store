import { ProductType } from "../category/ProductType";

export interface DesignerSizeToCreate {
    designerId: string,
    type: ProductType,
    name: string,
    breast?: string,
    waist?: string,
    hips?: string,
    height?: string,
    slipsole?: string,
    categoryId?: string
}