import React from "react";
import instagram from "../../assets/icons/main-page/7.png";
import facebook from "../../assets/icons/main-page/8.png";
import telegram from "../../assets/icons/main-page/9.png";
import "./contactsCommponent.scss";

export const ContactsCommponent = () => (
    <>
        <h3 className="contactsCommponent__title">Контакти</h3>
        <div className="prev">
            <div className="prev__carts">
                <a href="https://www.instagram.com/hub_ukrainian_brands/" target="_blank" rel="noreferrer">
                    <img src={instagram} alt="hub_ukrainian_brands instagram" title="hub_ukrainian_brands instagram" className="prev__icon" /></a>
                <a href="https://www.facebook.com/HubUkrainianBrands" target="_blank" rel="noreferrer">
                    <img src={facebook} alt="Hub Ukrainian Brands facebook" title="Hub Ukrainian Brands facebook" className="prev__icon" /></a>
                <a href="https://t.me/hub_ukr_brands" target="_blank" rel="noreferrer">
                    <img src={telegram} alt="hub_ukr_brands telegram" title="hub_ukr_brands telegram" className="prev__icon prev__telegram" /></a>
            </div>
        </div>
    </>
)