import { Category } from "../category/Category";
import { MagazinePicture } from "./MagazinePicture";

export interface Magazine {
    id: string,
    creationDate: string,
    isActive: boolean,
    isDeleted: boolean,
    name: string,
    url: string,
    categoryId: string,
    category?: Category,
    mainDescription: string,
    magazinePictures: MagazinePicture[],
    subDescription2?: string,
    subDescription3?: string,
    subDescription4?: string,
    subDescription5?: string,
    subDescription6?: string,
    subName2?: string,
    subName3?: string,
    subName4?: string,
    subName5?: string,
    subName6?: string,
}