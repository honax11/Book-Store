import React, { useContext, useEffect, useState } from "react";
import { get, postReturnBody } from "shared/services/HTTPUserService";
import { store } from "store";
import "./checkOutContainer.scss";
import { showInfo } from "shared/toast/notification";
import { PersonalInfoBlock } from "./PersonalInfoBlock";
import { ThreeDots } from "react-loader-spinner";
import { SuccessfulCheckOrderPopup } from "shared/components/popups/successful-check-order/SuccessfulCheckOrderPopup";
import { useNavigate } from "react-router-dom";
import { OrderBlock } from "./OrderBlock";
import { CountryType } from "shared/models/check-out/CountryType";
import { Delivery } from "shared/models/check-out/Delivery";
import { PaymentType } from "shared/models/check-out/PaymentType";
import { OrderProductView } from "shared/models/check-out/OrderProductView";
import { OrderToCreate } from "shared/models/check-out/OrderToCreate";
import { DeliveryInfoBlock } from "./DeliveryInfoBlock";
import { OrderResponse } from "shared/models/check-out/OrderResponse";
import { CustomerInfo } from "shared/models/check-out/CustomerInfo";
import { NovaPoshtaCity } from "shared/models/check-out/NovaPoshtaCity";
import { NovaPoshtaWarehouse } from "shared/models/check-out/NovaPoshtaWarehouse";
import { preOrderedRequest } from "shared/services/CustomerClickService";

const CheckOutContainer = () => {
    const [country, setCountry] = React.useState<CountryType>(CountryType.Ukraine);
    const [deliverySelect, setDeliverySelect] = React.useState<Delivery>(Delivery.SelfPickup);

    const [isPayActive, setIsPayActive] = React.useState(false);
    const [internationalCountry, setInternationalCountry] = React.useState('');
    const [city, setCity] = React.useState('');

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phone, setPhone] = React.useState<string>('');
    const [email, setEmail] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [house, setHouse] = React.useState('');
    const [appartment, setAppartment] = React.useState('');
    const [paymentType, setPaymentType] = React.useState<PaymentType>(PaymentType.LiqPay);
    const [comment, setComment] = React.useState('');
    const [callBack, setCallBack] = React.useState(false);
    const [information, setInformation] = React.useState(false);
    const [totalPrice, setTotalPrice] = React.useState(Number);
    const [warehouses, setWarehouses] = React.useState<NovaPoshtaWarehouse[]>([]);
    const [ukrCities, setUkrCities] = React.useState<NovaPoshtaCity[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [warehousesSelect, setWarehousesSelect] = React.useState<string>('');
    const [validation, setValidation] = React.useState(true);
    const [numberOrder, setOrder] = useState("");
    const [modalActive, setInCreateOrder] = useState(false);
    const [isCityLoading, setIsCityLoading] = useState(false);
    const [orderResponse, setOrderResponse] = useState<OrderResponse>();

    const globalState = useContext(store);
    let navigate = useNavigate();

    useEffect(() => {
        sumTotalPrice();
    });

    useEffect(() => {
        getPesonalInfoFromStorage();
    }, []);

    const setCitySelect = (e: any) => {
        setCity(e?.name);
        getWarehouses(e?.name, deliverySelect);
    }
    const changeDeliveryType = (type: Delivery) => {
        setDeliverySelect(type);
        getWarehouses(city, type);
    }

    const getWarehouses = (city: string, type: Delivery) => {
        get(`NovaPoshta/GetWarehouses?city=${city}&type=${type}`).then((res) => {
            setWarehouses(res);
        })
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();
        setIsPayActive(true);
        if (!validateOrder()) {
            return;
        }
        setLoading(true);

        const orderProducts: OrderProductView[] = [];
        globalState.appState.products.map(item => {
            orderProducts.push({
                productId: item.id,
                quantity: item.quantity,
                sizeId: item.size
            })
        });

        let order: OrderToCreate = {
            city: city,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            street: street,
            house: house,
            appartment: appartment,
            comment: comment,
            callBack: callBack,
            totalPrice: totalPrice,
            paymentType: paymentType!,
            country: "",
            novaPoshta: "",
            orderProducts: orderProducts
        };

        if (country === CountryType.Ukraine) {
            order.country = CountryType[country];
            if (deliverySelect === Delivery.SelfPickup || deliverySelect === Delivery.Poshtomat) {
                order.novaPoshta = warehousesSelect;
            }
        } else {
            order.country = internationalCountry;
        }

        postReturnBody(`Order/Create`, order)
            .then((res: OrderResponse) => {
                localStorage.setItem('OrderId', res.orderNumber);
                if (paymentType == PaymentType.LiqPay) {
                    setOrderResponse(res);
                    setTimeout(() => {
                        let element = document.getElementById('liq-pay-button');
                        element?.click();
                    }, 300)
                } else {
                    setInCreateOrderClick(res.orderNumber)
                }
                setLoading(false);
                setIsPayActive(false);
            });
    }

    const validateEmail = (userOption: string) => {
        let checker = /\S+@\S+\.\S+/;
        return checker.test(userOption);
    }
    const validatePhone = (userOption: string) => {
        let checker = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return checker.test(userOption);
    }

    const onPressNext = (set: boolean) => {
        if (isEmptyOrSpaces(firstName)) {
            setValidation(false);
            showInfo("Заповніть особисті дані");
            return;
        }
        if (isEmptyOrSpaces(lastName)) {
            setValidation(false);
            showInfo("Заповніть особисті дані");
            return;
        }
        if (!validatePhone(phone)) {
            setValidation(false);
            showInfo("Заповніть особисті дані");
            return;
        }
        if (!validateEmail(email)) {
            setValidation(false);
            showInfo("Заповніть особисті дані");
            return;
        }
        setPesonalInfoToStorage();
        setInformation(set);
        setValidation(true);
    }
    const validateOrder = (): boolean => {
        if (isEmptyOrSpaces(city)) {
            setValidation(false);
            showInfo("Заповніть дані для доставки");
            return false;
        }
        if (country === CountryType.Other) {
            if (isEmptyOrSpaces(internationalCountry)) {
                setValidation(false);
                showInfo("Заповніть дані для доставки");
                return false;
            }
        }

        if (deliverySelect === Delivery.NovaPoshtaDevivery || country == CountryType.Other) {
            if (isEmptyOrSpaces(street)) {
                setValidation(false);
                showInfo("Заповніть дані для доставки");
                return false;
            }
            if (isEmptyOrSpaces(house)) {
                setValidation(false);
                showInfo("Заповніть дані для доставки");
                return false;
            }
        }
        else {
            if (isEmptyOrSpaces(warehousesSelect!)) {
                setValidation(false);
                showInfo("Заповніть інформацію про доставку");
                return false;
            }
        }
        setValidation(true);

        return true;
    }

    const setPesonalInfoToStorage = () => {
        let customerInfor: CustomerInfo = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            productIds: globalState.appState.products.map(item => item.id)
        }
        localStorage.setItem("PersonalInfo", JSON.stringify(customerInfor));
        customerInfor.ip = "";
        preOrderedRequest("PressNext", customerInfor);
    }

    const getPesonalInfoFromStorage = () => {
        const tempCutomer = localStorage.getItem('PersonalInfo');
        if (tempCutomer) {
            const customerInfo = JSON.parse(tempCutomer) as CustomerInfo;
            setFirstName(customerInfo.firstName);
            setLastName(customerInfo.lastName);
            setPhone(customerInfo.phone);
            setEmail(customerInfo.email);
        }
    }

    const isEmptyOrSpaces = (str: string): boolean => {
        return str === undefined || str.match(/^ *$/) !== null;
    }

    const sumTotalPrice = () => {
        let total = 0;
        if (globalState) {
            globalState.appState.products.map(item => {
                if (item.salePrice > 0) {
                    total += (item.salePrice * item.quantity);
                }
                else {
                    total += (item.price * item.quantity);
                }
            });

            setTotalPrice(total);
        }
    }

    const setInCreateOrderClick = (numberOrder: string) => {
        setOrder(numberOrder);
        setInCreateOrder(true);
    }

    const closeFinalOrderPopup = () => {
        setInCreateOrder(false);
        onEmptyShoppingCart();
        navigate('/');
    }

    const onEmptyShoppingCart = () => {
        let tempState = { ...globalState.appState };
        tempState.products = [];
        tempState.isShopingCartOpen = false;
        globalState.setAppState({ ...tempState });
    }

    return (
        <div>
            <div className="container">
                <ThreeDots visible={loading} color='black' wrapperStyle={{ "justifyContent": "center" }} />
                <div className="check-out-main">
                    <div className="check-out-left">
                        <div className="payment-step">
                            <label onClick={() => setInformation(false)} ><div className="text text-one"><div><p className={`one ${information ? '' : 'step-active'}`}>1</p></div>Особисті дані</div></label>
                            <label onClick={() => onPressNext(true)} ><div className="text label-one-two"><div><div className={`one ${information ? 'step-active' : ''}`}>2</div></div>Інформація про доставку</div></label>
                        </div>
                        {!information &&
                            <PersonalInfoBlock
                                email={email}
                                setEmail={setEmail}
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                phone={phone}
                                setPhone={setPhone}
                                validation={validation}
                                onPressNext={onPressNext}
                            ></PersonalInfoBlock>
                        }

                        {information &&
                            <DeliveryInfoBlock appartment={appartment} city={city} comment={comment} country={country}
                                deliverySelect={deliverySelect} house={house} internationalCountry={internationalCountry}
                                isPayActive={isPayActive} onSubmitForm={onSubmitForm} paymentType={paymentType} isCityLoading={isCityLoading}
                                setAppartment={setAppartment} setCallBack={setCallBack} setCity={setCity}
                                setCitySelect={setCitySelect} setComment={setComment} setCountry={setCountry}
                                setDeliverySelect={changeDeliveryType} setHouse={setHouse} setWarehouses={setWarehouses}
                                setInternationalCountry={setInternationalCountry} setPaymentType={setPaymentType}
                                setStreet={setStreet} setWarehousesSelect={setWarehousesSelect} setUkrCities={setUkrCities}
                                street={street} ukrCities={ukrCities} validation={validation} signature={orderResponse?.signature}
                                warehouses={warehouses} data={orderResponse?.data} price={totalPrice} warehousesSelect={warehousesSelect}
                            ></DeliveryInfoBlock>
                        }
                    </div>
                    <OrderBlock totalPrice={totalPrice}></OrderBlock>
                </div>
            </div>
            <SuccessfulCheckOrderPopup closeModal={closeFinalOrderPopup} modalIsOpen={modalActive} numberOrder={numberOrder}></SuccessfulCheckOrderPopup>
        </div>
    )
}
export default CheckOutContainer;