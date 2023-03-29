import { BannerType } from "../enums/BannerType";
import { Product } from "../product/Product";

export interface GetAllBannerViewItem {
    id: string,
    creationDate: string,
    isActive: boolean,
    isDeleted: boolean,
    url: string,
    productUrl?: string,
    name?: string,
    description?: string,
    order?: number,
    moreFromId?: string,
    type: BannerType,
    products: Product[]
}