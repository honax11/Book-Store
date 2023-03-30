import React from "react";
import "./deliveryContainer.scss"

const DeliveryContainer = () => {
    return (
        <div className="delivery">
            <div className="container">
                <div className="delivery__media">
                    <div className="delivery__title">Доставка</div>
                    <p className="delivery__text">Ми доставляємо товари по Україні та за її межі.</p>
                    <p className="delivery__text"><b>По Україні</b> доставка здійснюється службою Нова Пошта за рахунок покупця:</p>
                    <ul className="delivery__list">
                        <li>у відділення</li>
                        <li>кур'єром до дверей</li>
                    </ul>
                    <p className="delivery__text--terms">Міжнародна доставка виконується за допомогою компаній Нова Пошта та  DHL.</p>
                    <p className="delivery__text--terms">Доставку оплачує покупець.</p>
                    <p className="delivery__text--terms">Важливо! Покупець сплачує можливі податки та мито.</p>
                </div>
                <div className="payment">
                    <div className="payment__media">
                        <div className="payment__title">Оплата</div>
                        <p className="payment__text">Варіанти оплати замовлення <b>по Україні:</b></p>
                        <ul className="payment__list">
                            <li>оплата будь-якою банківською картою на сайті, при оформленні замовлення</li>
                            <li>оплата по реквізитам</li>
                        </ul>
                        <p className="payment__text">Оплата <b>міжнародного замовлення:</b></p>
                        <ul className="payment__list">
                            <li>оплата будь-якою банківською картою на сайті, при оформленні замовлення</li>
                            <li>оплата по реквізитам</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeliveryContainer;