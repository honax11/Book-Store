import { BrandPicture } from "./BrandPicture";

export interface Brand {
    id: string,
    creationDate: string,
    isActive: boolean,
    isDeleted: boolean,
    firstName: string,
    lastName: string,
    description: string,
    url: string,
    pictures: BrandPicture[],
    imageAlt?: string
}