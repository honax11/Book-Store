import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from 'shared/models/category/Category';
import { ProductType } from 'shared/models/category/ProductType';
import { ClickType } from 'shared/models/enums/ClickType';
import { clickRequest } from 'shared/services/CustomerClickService';
import { MainButtons } from './mainButtons';
import './mobile-menu.scss';

interface Props {
    modalIsOpen: boolean;
    closeModal: (isActive: boolean) => void;
    categories: Readonly<Category[]>
}

export const Menu = (props: Props) => {
    const { modalIsOpen, closeModal, categories } = props;

    const onMove = (url: string, name: string) => {
        const click = {
            city: "",
            country: "",
            ip: "",
            name: name,
            type: ClickType.PressOnMobileMenu,
            productType: ProductType.None
        };
        clickRequest("PressOnMobileMenu", click);
        window.open(url, "_self");
    }

    return (
        <div className="sidebar-menu" hidden={modalIsOpen}>
            <div className="container">
                <MainButtons closeModal={(e) => closeModal(false)} key={ProductType.Clothes} categories={categories} name='ОДЯГ' type={ProductType.Clothes}></MainButtons>
                <MainButtons closeModal={(e) => closeModal(false)} key={ProductType.Shose} categories={categories} name='ВЗУТТЯ' type={ProductType.Shose}></MainButtons>
                <MainButtons closeModal={(e) => closeModal(false)} key={ProductType.Accessories} categories={categories} name='АКСЕСУАРИ' type={ProductType.Accessories}></MainButtons>
                <a href='/brands' onClick={(e) => onMove("/brands", "Brands")} className="sidebar-menu__pb"><div className="sidebar-menu__micro-buttons">БРЕНДИ</div></a>
                <a href='/sale' onClick={(e) => onMove("/sale", "SALE")} className="sidebar-menu__pb"><div className="sidebar-menu__micro-buttons">SALE</div></a>
                <a href='/magazine' onClick={(e) => onMove("/magazine", "Blog")} className="sidebar-menu__pb"><div className="sidebar-menu__micro-buttons">БЛОГ</div></a>
                <a href='/about-us' onClick={(e) => onMove("/about-us", "About Us")} className="sidebar-menu__pb"><div className="sidebar-menu__micro-buttons">ПРО НАС</div></a>
                <a href='/contacts' onClick={(e) => onMove("/contacts", "Contacts")} className="sidebar-menu__pb"><div className="sidebar-menu__micro-buttons">Контакти</div></a>
                <a href='/cooperation' onClick={(e) => onMove("/cooperation", "Cooperation")} className="sidebar-menu__pb"><div className="sidebar-menu__micro-buttons">Співпраця</div></a>
                <a href='/privacy-policy' onClick={(e) => onMove("/privacy-policy", "privacy-policy")} className="sidebar-menu__pb"><div className="sidebar-menu__micro-buttons">Політика конфіденційності</div></a>
                <a href='/delivery-payment' onClick={(e) => onMove("/delivery-payment", "delivery-payment")} className="sidebar-menu__pb"><div className="sidebar-menu__micro-buttons">Оплата</div></a>
                <a href='/return' onClick={(e) => onMove("/return", "return")} className="sidebar-menu__pb"><div className="sidebar-menu__micro-buttons">Повернення</div></a>
                <a href='/public-offer' onClick={(e) => onMove("/public-offer", "public-offer")} className="sidebar-menu__pb"><div className="sidebar-menu__micro-buttons">Публічна оферта</div></a>
            </div>
        </div>
    );
}