import React from "react";
import { Link } from "react-router-dom";
import "./failedPaymentContainer.scss"
import imageClothes from "../../assets/icons/icons-payment/clothes.jpg" ;
import imageShose from "../../assets/icons/icons-payment/shose.jpg" ;
import imageAccessories from "../../assets/icons/icons-payment/accessories.jpg" ;

export const FailedPaymentContainer = () => {
    return (
        <div className="failed-payment">
            <div className="container">
                <div className="failed-payment__h1"><b>Упс, щось пішло не так!</b></div>
                <div className="failed-payment__h2"><b>Але ми зберегли ваше замовлення №___</b></div>
                <div className="failed-payment__h3">Очікуйте додаткове повідомлення з варіантами оплати.</div>
                <div className="failed-payment__h4"><b>Повернутися до:</b></div>
                <div className="failed-payment__return">
                    <div>
                        <div><Link to="/clothes" className="failed-payment__wraper">ОДЯГ</Link></div>
                        <Link to="/clothes" ><img src={imageClothes} alt=""/></Link>
                    </div>
                    <div>
                        <div><Link to="/shose" className="failed-payment__wraper">ВЗУТТЯ</Link></div>
                        <Link to="/shose" ><img src={imageShose} alt=""/></Link>
                    </div>
                    <div>
                        <div><Link to="/accessories" className="failed-payment__wraper">АКСЕСУАРИ</Link></div>
                        <Link to="/accessories" ><img src={imageAccessories} alt=""/></Link>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default FailedPaymentContainer;