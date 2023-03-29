import React from "react";
import "./liqPay.scss";

interface Props {
    data: string,
    signString: string,
    price: number
}

export const LiqPayButton = (props: Props) => {
    const { data, signString, price } = props;

    return (
        <form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">
            <input type="hidden" name="data" value={data} className="inputStyle" />
            <input type="hidden" name="signature" value={signString} className="inputStyle" />
            <button className="liq-pay-button" id='liq-pay-button'>
                <img src="https://static.liqpay.ua/buttons/logo-small.png" className="liq-pay-image" />
                <span className="liq-pay-span" >Сплатити {price} UAH</span>
            </button>
        </form>
    );
}