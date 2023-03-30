import { Category } from "shared/models/category/Category";
import { Size } from "shared/models/sizes/Size";
import { ProductColor } from "shared/models/clothes/ProductColor";
import { get } from "shared/services/HTTPUserService";

export const getAllCategories = (setCategory: (cat: Category[]) => void, id: string) => {
    get(`Category/GetAllByBrand?id=${id}`)
        .then((response) => {
            setCategory(response);
        });
};

export const getAllSizes = (setSizes: (cat: Size[]) => void, id: string) => {
    get(`Size/GetAllByDesigner?id=${id}`)
        .then((response) => {
            setSizes(response);
        });
};

export const getAllColor = (setColors: (cat: ProductColor[]) => void, id: string) => {
    get(`Product/GetAllColorsForBrand?id=${id}`)
        .then((response) => {
            const res = response.map((item: string) => {
                return {
                    id: item,
                    name: item,
                };
            });
            setColors(res);
        });
};