import { ProductType } from "shared/models/category/ProductType";
import { ProductFilters } from "shared/models/clothes/ProductFilters";
import { ClickType } from "shared/models/enums/ClickType";
import { clickRequest } from "shared/services/CustomerClickService";

export const onRequestGetAllScroll = (type: ProductType, filters: ProductFilters) => {
    const click = {
        city: "",
        country: "",
        ip: "",
        name: "",
        type: ClickType.ScrollAllProducts,
        productType: type,
        categories: filters.categories
    };
    clickRequest("scrollsAllProducts", click);
}

export const onRequestSaleScroll = (type: ProductType, filters: ProductFilters) => {
    const click = {
        city: "",
        country: "",
        ip: "",
        name: "",
        type: ClickType.RequestSale,
        productType: type,
        categories: filters.categories
    };
    clickRequest("RequestSale", click);
}


export const getAllBrandsClick = () => {
    const click = {
        city: "",
        country: "",
        ip: "",
        name: "",
        type: ClickType.GetAllBrands,
        productType: ProductType.None,
    };
    clickRequest("GetAllBrands", click);
}

export const openMainPage = () => {
    const click = {
        city: "",
        country: "",
        ip: "",
        name: "",
        type: ClickType.OpenMainPage,
        productType: ProductType.None,
    };
    clickRequest("OpenMainPage", click);
}

export const getBrandClick = (url: string) => {
    const click = {
        city: "",
        country: "",
        ip: "",
        name: url,
        type: ClickType.GetBrand,
        productType: ProductType.None,
    };
    clickRequest("GetBrand", click);
}

export const getMagazineClick = (name: string) => {
    const click = {
        city: "",
        country: "",
        ip: "",
        name: name,
        type: ClickType.GetMagazine,
        productType: ProductType.None,
    };
    clickRequest("GetMagazine", click);
}

export const getMagazineAllClick = () => {
    const click = {
        city: "",
        country: "",
        ip: "",
        name: "",
        type: ClickType.GetAllMagazines,
        productType: ProductType.None,
    };
    clickRequest("GetAllMagazines", click);
}