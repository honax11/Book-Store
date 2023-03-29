import { BannerType } from "../enums/BannerType";

export interface Banner {
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
    type: BannerType
}