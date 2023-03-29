import { SortList } from "shared/models/enums/SortList";
import { ProductType } from "../category/ProductType";

export interface ProductFilters {
    colors: string[],
    categories: string[],
    sizes: string[],
    type: ProductType,
    sortList: SortList,
    page: number,
    pageSize: number
}