import { BrandPicture } from "shared/models/brands/BrandPicture";

export interface Designer {
    id: string,
    creationDate: string,
    isActive: boolean,
    isDeleted: boolean,
    firstName: string,
    lastName: string,
    url: string,
    description: string,
    pictures: BrandPicture[],
    imageAlt?: string
}