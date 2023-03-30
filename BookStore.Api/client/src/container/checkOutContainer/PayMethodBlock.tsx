import React from "react";
import { PaymentType } from "shared/models/check-out/PaymentType";
import { LiqPayButton } from "./LiqPay";
import "./payMethodBlock.scss"

interface Props {
    paymentType: PaymentType;
    setPaymentType: (type: number) => void;
    comment: string;
    setComment: (comment: string) => void;
    setCallBack: (callBack: boolean) => void;
    onSubmitForm: (e: any) => void;
    isPayActive: boolean;
    data?: string,
    signature?: string,
    price: number
}

export const PayMethodBlock = (props: Props) => {
    const { paymentType, comment, data, signature, price,
        setPaymentType, setComment, setCallBack, onSubmitForm } = props;

    return (
        <div className="check-out-right-info">
            <div className="check-out-element-width">
                <div className="mb-3">
                    <label>Варіанти оплати</label>
                    <select className="form-control-back-ground selectStyle mb-3" value={paymentType} onChange={(e) => setPaymentType(+e.target.value)}>
                        <option key={PaymentType.LiqPay} value={PaymentType.LiqPay} >Online</option>
                        <option key={PaymentType.Check} value={PaymentType.Check} >Оплата за реквізитами</option>
                    </select>
                    <label className="check-out-element-width payment-margin-top">Додати коментар до замовлення</label>
                    <textarea
                        className="form-control-back-ground inputStyle"
                        placeholder="Коментар"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
            </div>
            <div className="payMethodBlock__checkbox">
                <input
                    className="call-back-lable"
                    type="checkbox"
                    onChange={(e) => setCallBack(e.target.checked)}
                />
                <p className="call-back">
                    Мені можна не дзвонити для підтвердження замовлення
                </p>
            </div>
            {!data && !signature &&
                <button
                    onClick={onSubmitForm}
                    type="button"
                    className="btn btn-dark btn-dark-payment2"
                >Оформити замовлення</button>}
            {data && signature &&
                <LiqPayButton
                    data={data}
                    signString={signature}
                    price={price}
                />}
        </div>
    )
};