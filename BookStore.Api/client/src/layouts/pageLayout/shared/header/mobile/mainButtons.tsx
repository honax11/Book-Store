import React, { useState } from 'react';
import { Category } from 'shared/models/category/Category';
import { ProductType } from 'shared/models/category/ProductType';
import { ClickType } from 'shared/models/enums/ClickType';
import { clickRequest } from 'shared/services/CustomerClickService';

interface Props {
    type: ProductType
    name: string
    categories: Readonly<Category[]>
    closeModal: (isActive: boolean) => void;
}

export const MainButtons = (props: Props) => {
    const { type, name, categories } = props;

    const [subMenuItemsActive, setSubMenuItemsActive] = useState(true);

    const onMove = (url: string, name: string) => {
        const click = {
            city: "",
            country: "",
            ip: "",
            name: name,
            type: ClickType.PressOnCategory,
            productType: ProductType.None
        };
        clickRequest("PressOnCategory", click);
        window.open(url, "_parent");
    }

    return (
        <div key={type} className="sidebar-menu__pb">
            <div className="sidebar-menu__mainBtn">
                <div onClick={() => onMove(`/${ProductType[type].toLowerCase()}`, `${ProductType[type]}`)} className="sidebar-menu__micro-buttons">{name}</div>
                <div onClick={() => setSubMenuItemsActive(!subMenuItemsActive)} className={`sidebar-menu__${!subMenuItemsActive ? 'active' : 'plus'}`}></div>
            </div>
            <ul hidden={subMenuItemsActive}>
                {categories.map(item => {
                    if (item.type == type) {
                        return (
                            <li key={item.id}>
                                <p onClick={() => onMove(`/${ProductType[type].toLocaleLowerCase()}/${item.url}`, item.name)} className="sidebar-menu__micro-button-menu">{item.name}</p>
                            </li>
                        )
                    }
                })}
            </ul>
        </div>
    );
}