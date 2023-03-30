import { Category } from "../category/Category";
import { ProductType } from "../category/ProductType";

export interface DesignerSize {
    id: string,
    creationDate: string,
    isActive: boolean,
    isDeleted: boolean,
    designerId: string,
    type: ProductType,
    name: string,
    breast?: string,
    waist?: string,
    hips?: string,
    height?: string,
    slipsole?: string,
    categoryId?: string,
    category?: Category
}