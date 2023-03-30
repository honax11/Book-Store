import React, { useState } from "react";
import { Category } from "shared/models/category/Category";
import { Size } from "shared/models/sizes/Size";
import { ProductColor } from "shared/models/clothes/ProductColor";
import { FilterType } from "shared/models/enums/FilterType";
import "./mobile-filters-popup.scss";

interface Props {
    modalFiltersOpen: boolean;
    closeModal: () => void;
    categories: Category[];
    sizes: Size[];
    colors: ProductColor[];
    onSelectCategory: (selectedList: any, selectedItem: any) => void;
    onRemoveCategory: (selectedList: any, selectedItem: any) => void;
    onSelectSize: (selectedList: any, selectedItem: any) => void;
    onRemoveSize: (selectedList: any, selectedItem: any) => void;
    onSelectColor: (selectedList: any, selectedItem: any) => void;
    onRemoveColor: (selectedList: any, selectedItem: any) => void;
    selectedCategories: Category[];
    selectedSizes: Size[];
    selectedColors: ProductColor[];
}

export const MobileFiltersPopup = (props: Props) => {
    const { modalFiltersOpen, closeModal, categories, sizes, colors,
        onSelectCategory, onRemoveCategory, onSelectSize, onRemoveSize, onSelectColor, onRemoveColor,
        selectedSizes, selectedCategories, selectedColors } = props;

    const [mainMenu, setMainMenu] = useState<boolean>(true);
    const [categoryMenu, setCategoryMenu] = useState<boolean>(false);
    const [sizeMenu, setSizeMenu] = useState<boolean>(false);
    const [colorMenu, setColorMenu] = useState<boolean>(false);

    const openSubMenu = (type: FilterType) => {
        setMainMenu(false);

        if (type === FilterType.Category) {
            setCategoryMenu(true);
        }
        if (type === FilterType.Color) {
            setColorMenu(true);
        }
        if (type === FilterType.Size) {
            setSizeMenu(true);
        }
    }

    const onCheckCategory = (category: Category) => {
        if (selectedCategories.includes(category)) {
            onRemoveCategory(category, category)
        } else {
            onSelectCategory(category, category)
        }
    }
    const onCheckColor = (color: ProductColor) => {
        if (selectedColors.includes(color)) {
            onRemoveColor(color, color)
        } else {
            onSelectColor(color, color)
        }
    }

    const onCheckSize = (size: Size) => {
        if (selectedSizes.includes(size)) {
            onRemoveSize(size, size)
        } else {
            onSelectSize(size, size)
        }
    }

    const onPressBack = (type: FilterType) => {
        setMainMenu(true);

        if (type === FilterType.Category) {
            setCategoryMenu(false);
        }
        if (type === FilterType.Color) {
            setColorMenu(false);
        }
        if (type === FilterType.Size) {
            setSizeMenu(false);
        }
    }

    return (
        <>
            <div className={modalFiltersOpen ? "modalWindow active" : "modalWindow"} onClick={() => closeModal()}>
                <div className={modalFiltersOpen ? "modalWindow__content active filters__active" : "modalWindow__content filters__active"} onClick={(e) => e.stopPropagation()}>
                    <div className="filters__title">
                        <div className="filters__titleText">Фільтри</div>
                        <div className="filters__titleText">
                            <button className="btn-close filters__bcg" onClick={() => closeModal()}></button>
                        </div>
                    </div>
                    <div className="filters__body">
                        {mainMenu &&
                            <div>
                                <div onClick={() => openSubMenu(FilterType.Category)} className="filters__list">Категорії</div>
                                <div onClick={() => openSubMenu(FilterType.Size)} className="filters__list">Розмір</div>
                                <div onClick={() => openSubMenu(FilterType.Color)} className="filters__list">Колір</div>
                            </div>
                        }
                        {categoryMenu &&
                            <ul className="filters__pt0">
                                <div>
                                    <div className="filters__left" onClick={(e) => onPressBack(FilterType.Category)}></div>
                                    <div className="d-flex justify-content-center">Категорії</div>
                                </div>
                                {categories.map(item => {
                                    return (
                                        <li key={item.id} onClick={(e) => onCheckCategory(item)} className={`${selectedCategories.includes(item) ? 'filters__listsDone' : 'filters__lists'}`}>{item.name}</li>
                                    )
                                })}
                            </ul>
                        }
                        {sizeMenu &&
                            <ul>
                                <div>
                                    <div className="filters__left" onClick={(e) => onPressBack(FilterType.Size)}></div>
                                    <div className="d-flex justify-content-center">Розмір</div>
                                </div>
                                {sizes.map(item => {
                                    return (
                                        <li key={item.id} onClick={(e) => onCheckSize(item)} className={`${selectedSizes.includes(item) ? 'filters__listsDone' : 'filters__lists'}`}>{item.name}</li>
                                    )
                                })}
                            </ul>
                        }
                        {colorMenu &&
                            <ul>
                                <div>
                                    <div className="filters__left" onClick={(e) => onPressBack(FilterType.Color)}></div>
                                    <div className="d-flex justify-content-center">Колір</div>
                                </div>
                                {colors.map(item => {
                                    return (
                                        <li key={item.id} onClick={(e) => onCheckColor(item)} className={`${selectedColors.includes(item) ? 'filters__listsDone' : 'filters__lists'}`}>{item.name}</li>
                                    )
                                })}
                            </ul>
                        }
                    </div>
                    <div className="sort__btn-ok" onClick={closeModal}>
                        ОК
                    </div>
                </div>
            </div>
        </>
    )
}