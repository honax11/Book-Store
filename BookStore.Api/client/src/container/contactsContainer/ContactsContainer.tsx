import React from "react";
import "./contactsContainer.scss"
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaTelegram } from 'react-icons/fa';

const ContactsContainer = () => {
    return (
        <div className="contacts">
            <div className="container">
                <div className="contacts__media">
                    <div className="contacts__title">Контакти</div>
                    <div className="contacts__general">
                        <p className="contacts__text">Ви можете зв’язатися з нами будь-яким зручним для вас способом:</p>
                        <ul className="contacts__list">
                            <li>Телефон для дзвінків: <a href="tel: +380675556204">+380675556204</a></li>
                            <li>Напишіть нам в Viber/Telegram: <a href="tel: +380675556204">+380675556204</a></li>
                            <li>E-mail: <a href="mailto:yana.petrenko.hub@gmail.com">yana.petrenko.hub@gmail.com</a></li>
                        </ul>
                    </div>
                    <ul className="social-icon">
                        <li><a className="social-icon-fb social-icon-color" href="https://www.facebook.com/HubUkrainianBrands" title=""
                            target="_blank" rel="noopener" ><FaFacebookF /></a></li>
                        <li><a className="social-icon-instagram social-icon-color" href="https://www.instagram.com/hub_ukrainian_brands/" title=""
                            target="_blank" rel="noopener" ><AiOutlineInstagram /></a></li>
                        <li ><a className="social-icon-telegram social-icon-color" href="https://t.me/hub_ukr_brands" title="" target="_blank"
                            rel="noopener" ><FaTelegram /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ContactsContainer;