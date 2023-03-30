import React from "react";
import Multiselect from 'multiselect-react-dropdown';
import { SortList } from "shared/models/enums/SortList";
import { Category } from "shared/models/category/Category";
import { Size } from "shared/models/sizes/Size";
import { ProductColor } from "shared/models/clothes/ProductColor";

export interface Props {
    categories: Category[];
    onSelectCategory: (selectedList: any, selectedItem: any) => void;
    onRemoveCategory: (selectedList: any, selectedItem: any) => void;
    sizes: Size[];
    onSelectSize: (selectedList: any, selectedItem: any) => void;
    onRemoveSize: (selectedList: any, selectedItem: any) => void;
    colors: ProductColor[];
    onSelectColor: (selectedList: any, selectedItem: any) => void;
    onRemoveColor: (selectedList: any, selectedItem: any) => void;
    onSelectSorting: (filter: SortList) => void;
}

export const WebFilters = (props: Props) => {
    const { categories, sizes, colors, onSelectColor, onRemoveColor,
        onSelectCategory, onRemoveCategory, onSelectSize, onRemoveSize, onSelectSorting } = props;

    return (
        <>
            <Multiselect
                id='Category'
                options={categories}
                onSelect={onSelectCategory}
                onRemove={onRemoveCategory}
                className="clothes__btn"
                displayValue="name"
                placeholder="Категорія"
                hidePlaceholder
                emptyRecordMsg="Всі категорії вибрані"
            />
            <Multiselect
                id='Size'
                options={sizes}
                onSelect={onSelectSize}
                onRemove={onRemoveSize}
                className="clothes__btn"
                displayValue="name"
                placeholder="Розмір"
                hidePlaceholder
                emptyRecordMsg="Всі розміри вибрані"
            />
            <Multiselect
                id='Collor'
                options={colors}
                onSelect={onSelectColor}
                onRemove={onRemoveColor}
                className="clothes__btn"
                displayValue="name"
                placeholder="Колір"
                hidePlaceholder
                emptyRecordMsg="Всі кольори вибрані"
            />
            <select name="sortList" id="1" className="clothes__last" onChange={(e) => onSelectSorting(+e.target.value)}>
                <option key={SortList.NewFirst} value={SortList.NewFirst}>Спочатку новинки</option>
                <option key={SortList.PriceIncrease} value={SortList.PriceIncrease}>Ціна за зростанням</option>
                <option key={SortList.PricesReduction} value={SortList.PricesReduction}>Ціна за спаданням</option>
            </select>
        </>
    )
}