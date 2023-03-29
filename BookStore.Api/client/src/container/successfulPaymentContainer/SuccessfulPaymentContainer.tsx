import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./successfulPaymentContainer.scss";
import imageClothes from "../../assets/icons/icons-payment/clothes.jpg";
import imageShose from "../../assets/icons/icons-payment/shose.jpg";
import imageAccessories from "../../assets/icons/icons-payment/accessories.jpg";

const SuccessfulPaymentContainer = () => {
    const [orderNumber, setOrderNumber] = React.useState(Number);
    useEffect(() => {
        const orderId = localStorage.getItem('OrderId');
        if (orderId) {
            setOrderNumber(+orderId);
        }
    }, []);
    return (
        <div className="successful-payment">
            <div className="container">
                <div className="successful-payment__h1"><b>Ваше замовлення №{orderNumber} успішно створено та оплачено!</b></div>
                <div className="successful-payment__h2">Очікуйте додаткове повідомлення з даними про відправку.</div>
                <div className="successful-payment__h3"><b>Повернутися до:</b></div>
                <div className="successful-payment__return">
                    <div>
                        <div><Link to="/clothes" className="successful-payment__wraper">ОДЯГ</Link></div>
                        <Link to="/clothes" ><img src={imageClothes} alt="" /></Link>
                    </div>
                    <div>
                        <div><Link to="/shose" className="successful-payment__wraper">ВЗУТТЯ</Link></div>
                        <Link to="/shose" ><img src={imageShose} alt="" /></Link>
                    </div>
                    <div>
                        <div><Link to="/accessories" className="successful-payment__wraper">АКСЕСУАРИ</Link></div>
                        <Link to="/accessories" ><img src={imageAccessories} alt="" /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SuccessfulPaymentContainer;