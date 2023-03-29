import React from "react";
import './footer.scss';
import { FaFacebookF, FaTelegramPlane } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';
import logo from "../../../../assets/icons/Vector.png";

export const Footer = React.memo((): React.ReactElement => (

    <footer className="footer">
        <div className="container">
            <div className="footer__divider"></div>
            <div className="footer__general">
                <div className="footer__first">
                    <img width={239} height={130} className="footer__logo" src={logo} alt="Logo H.U.B." title="Footer Logo H.U.B."></img>
                </div>
                <div className="footer__two">
                    <a href={process.env.REACT_APP_URL + '/magazine'} className="footer__color footer__position footer__padding">Блог</a>
                    <a href={process.env.REACT_APP_URL + `/about-us`} className="footer__color footer__position footer__padding">Про нас</a>
                    <a href={process.env.REACT_APP_URL + `/contacts`} className="footer__color footer__position footer__padding">Контакти</a>
                    <a href={process.env.REACT_APP_URL + `/cooperation`} className="footer__color footer__position footer__padding">Співпраця</a>
                    <a href={process.env.REACT_APP_URL + `/delivery-payment`} className="footer__color footer__position footer__padding">Доставка та оплата</a>
                    <a href={process.env.REACT_APP_URL + `/return`} className="footer__color footer__position footer__padding">Повернення</a>
                    <a href={process.env.REACT_APP_URL + `/public-offer`} className="footer__color footer__position footer__padding">Публічна оферта</a>
                    <a href={process.env.REACT_APP_URL + `/privacy-policy`} className="footer__color footer__position footer__padding">Політика конфіденційності</a>
                </div>
                <div className="footer__tree">
                    <div className="footer__contact">
                        <div className="footer__contact footer__pb-3"><b>Контакти</b></div>
                        <div className="footer__contact footer__padding">Телефон: +380675556204</div>
                        <div className="footer__contact">E-mail: yana.petrenko.hub@gmail.com</div>
                    </div>
                    <div className="social-icons">
                        <a className="social-icon-color" href="https://t.me/hub_ukr_brands" aria-label="HubUkrainianBrands Telegram" title="HubUkrainianBrands Telegram" target="_blank"
                            rel="noreferrer" ><FaTelegramPlane /></a>
                        <a className="social-icon-color" href="https://www.facebook.com/HubUkrainianBrands" aria-label="HubUkrainianBrands Facebook" title="HubUkrainianBrands Facebook"
                            target="_blank" rel="noreferrer" ><FaFacebookF /></a>
                        <a className="social-icon-color" href="https://www.instagram.com/hub_ukrainian_brands/" aria-label="HubUkrainianBrands Instagram" title="HubUkrainianBrands Instagram"
                            target="_blank" rel="noreferrer" ><AiOutlineInstagram /></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
));