import React from "react";
import "./cooperationContainer.scss";

const CooperationContainer = () => {
    return (
        <div className="cooperation">
            <div className="container">
                <div className="cooperation__media">
                    <div className="cooperation__title">Співпраця</div>
                    <p className="cooperation__text">Ми співпрацюємо з українськими брендами одягу, взуття та аксессуарів</p>
                    <p className="cooperation__text cooperation__text--text">Якщо ви виробник товарів - напишіть на e-mail:<a href="mailto:yana.petrenko.hub@gmail.com">yana.petrenko.hub@gmail.com</a> та вкажіть:</p>
                    <ul className="cooperation__list">
                        <li>Назву бренду</li>
                        <li>Лінк на сторінку бренду в соцмережах чи сайт</li>
                        <li>Прайс </li>
                        <li>Лукбук чи лінк на фото останньої колекції</li>
                    </ul>
                    <p className="cooperation__text">Якщо вас цікавить спіпраця іншого плану – напишіть <a href="mailto:yana.petrenko.hub@gmail.com">yana.petrenko.hub@gmail.com</a>.</p>
                </div>
            </div>
        </div>
    )
}
export default CooperationContainer;