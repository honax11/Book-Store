import React from "react";
import "./returnContainer.scss";

const ReturnContainer = () => {
    return (
        <div className="return">
            <div className="container">
                <div className="return__media">
                    <div className="return__title">Повернення</div>
                    <p className="return__text">Ви маєте право повернути товар <b>належної якості</b> протягом 14 днів з дати отримання товару, відповідно до ст. 9 Закону України «Про захист прав споживачів»</p>
                    <p className="return__text">Щоб зробити повернення:</p>
                    <ul className="return__list">
                        <li>напишіть нам про намір повернути товар (вкажіть номер замовлення, артикул товару і розмір)</li>
                        <li>відправте товар Новою Поштою (дані для повернення будуть вам надіслані). Доставку оплачує покупець.</li>
                        <li>протягом 3 робочих днів, після отримання нами і перевірки товару, ваші кошти будуть повернуті</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ReturnContainer;