import React from "react";
import { CountryType } from "shared/models/check-out/CountryType";
import { PaymentType } from "shared/models/check-out/PaymentType";
import { PayMethodBlock } from "./PayMethodBlock";
import { StreetBlock } from "./StreetBlock";
import { Delivery } from "shared/models/check-out/Delivery";
import { NovaPoshtaCity } from "shared/models/check-out/NovaPoshtaCity";
import { NovaPoshtaWarehouse } from "shared/models/check-out/NovaPoshtaWarehouse";
import { get } from "shared/services/HTTPUserService";
import LiveSearch from "shared/components/live-search/LiveSearch";
import "./checkOutContainer.scss";

interface Props {
    paymentType: PaymentType;
    validation: boolean;
    country: CountryType;
    internationalCountry: string;
    deliverySelect: Delivery;
    appartment: string;
    house: string;
    street: string;
    city: string;
    comment: string;
    isPayActive: boolean;
    warehouses: NovaPoshtaWarehouse[];
    ukrCities: NovaPoshtaCity[];
    data?: string;
    signature?: string;
    price: number;
    isCityLoading: boolean;
    warehousesSelect: string;
    setCountry: (country: number) => void;
    setCitySelect: (e: any) => void;
    setUkrCities: (e: any) => void;
    setWarehouses: (e: any) => void;
    setInternationalCountry: (country: string) => void;
    setCity: (city: string) => void;
    setAppartment: (appartment: string) => void;
    setHouse: (house: string) => void;
    setStreet: (street: string) => void;
    setComment: (comment: string) => void;
    setCallBack: (callBack: boolean) => void;
    setPaymentType: (type: PaymentType) => void;
    setWarehousesSelect: (warehouse: any) => void;
    setDeliverySelect: (delivery: Delivery) => void;
    onSubmitForm: (e: any) => void;
}


export const DeliveryInfoBlock = (props: Props) => {
    const { warehousesSelect, validation, paymentType, country,
        internationalCountry, deliverySelect, appartment, house, street, city, isPayActive,
        comment, warehouses, ukrCities, data, signature, price,
        setCountry, setCitySelect, setUkrCities, setWarehouses,
        setInternationalCountry, setCity, setAppartment,
        setHouse, setStreet, setComment, setCallBack, setPaymentType,
        onSubmitForm, setWarehousesSelect, setDeliverySelect } = props;

    type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
    const handleChange: changeHandler = (e) => {
        const { target } = e;
        if (!target.value.trim()) return setUkrCities([]);
        const upperCaseCity = target.value.toUpperCase();
        get(`NovaPoshta/GetCities?name=${upperCaseCity}`).then((res) => {
            setUkrCities(res);
        });
    };

    const getWarehouses: changeHandler = (e) => {
        const { target } = e;
        if (!target.value.trim()) return setUkrCities([]);
        get(`NovaPoshta/GetWarehouses?city=${city}&type=${deliverySelect}&house=${target.value}`).then((res) => {
            setWarehouses(res);
        })
    }

    return (
        <div className="check-out-information">
            <div className="check-out-left-info">
                <div className="check-out-element-width payment-margin-bottom">
                    <label className={` ${validation || CountryType?.Ukraine || CountryType?.Other ? '' : 'validation-color'}`}>Країна*</label>
                    <select className="form-control-back-ground selectStyle" value={country} onChange={(e) => setCountry(+e.target.value)}>
                        <option key={CountryType.Ukraine} value={CountryType.Ukraine} >Україна</option>
                        <option key={CountryType.Other} value={CountryType.Other} >Європа</option>
                    </select>
                </div>
                {country === CountryType.Ukraine &&
                    <div className="check-out-element-width mb-3">
                        <label className={`${validation || city ? '' : 'validation-color'} `}>Місто*</label>
                        <LiveSearch
                            results={ukrCities}
                            value={city}
                            renderItem={(item) => <p>{item.name}</p>}
                            onChange={handleChange}
                            onSelect={(item) => setCitySelect(item)}
                            placeHolder="Напишіть назву міста"
                        />
                    </div>
                }

                {country != CountryType.Ukraine &&
                    <div>
                        <div className="check-out-element-width payment-margin-bottom">
                            <label className={`${validation || internationalCountry ? '' : 'validation-color'}`}>Країна*</label>
                            <input
                                className="form-control-back-ground inputStyle"
                                placeholder="Country"
                                value={internationalCountry}
                                onChange={(e) => setInternationalCountry(e.target.value)}
                            />
                        </div>
                        <div className="check-out-element-width payment-margin-bottom">
                            <div className="mb-3">
                                <label className={`${validation || city ? '' : 'validation-color'}`}>Місто*</label>
                                <input
                                    className="form-control-back-ground inputStyle"
                                    placeholder="Місто"
                                    autoFocus
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                }

                {country == CountryType.Ukraine && city &&
                    <div className="check-out-element-width payment-margin-bottom">
                        <label className={`${validation || Delivery?.SelfPickup || Delivery?.NovaPoshtaDevivery || Delivery?.Poshtomat ? '' : 'validation-color'}`}>Варіанти доставки:</label>
                        <select className="form-control-back-ground selectStyle" value={deliverySelect} onChange={(e) => setDeliverySelect(+e.target.value)}>
                            <option key={Delivery.SelfPickup} value={Delivery.SelfPickup}>відділення Нова пошта</option>
                            <option key={Delivery.NovaPoshtaDevivery} value={Delivery.NovaPoshtaDevivery}>кур'єр Нова пошта</option>
                            <option key={Delivery.Poshtomat} value={Delivery.Poshtomat}>Поштомат</option>
                        </select>
                    </div>}

                {country == CountryType.Other && city &&
                    <StreetBlock
                        validation={validation}
                        appartment={appartment}
                        house={house}
                        street={street}
                        setAppartment={(st) => setAppartment(st)}
                        setHouse={(h) => setHouse(h)}
                        setStreet={(s) => setStreet(s)}
                    ></StreetBlock>
                }

                {country == CountryType.Ukraine && city && deliverySelect == Delivery.NovaPoshtaDevivery &&
                    <StreetBlock
                        validation={validation}
                        appartment={appartment}
                        house={house}
                        street={street}
                        setAppartment={(st) => setAppartment(st)}
                        setHouse={(h) => setHouse(h)}
                        setStreet={(s) => setStreet(s)}
                    ></StreetBlock>
                }

                {country == CountryType.Ukraine &&
                    city &&
                    (deliverySelect == Delivery.SelfPickup || deliverySelect == Delivery.Poshtomat) &&
                    <div className="check-out-element-width payment-margin-bottom">
                        <label className={`${validation || warehousesSelect ? '' : 'validation-color'}`}>Відділення*</label>
                        <LiveSearch
                            results={warehouses}
                            value={warehousesSelect}
                            renderItem={(item) => <p>{item.name}</p>}
                            onChange={getWarehouses}
                            onSelect={(item) => setWarehousesSelect(item.name)}
                            placeHolder="Виберіть відділення нової пошти"
                        />
                    </div>
                }
            </div>
            {city && country != CountryType.None &&
                <PayMethodBlock
                    isPayActive={isPayActive}
                    comment={comment}
                    data={data}
                    signature={signature}
                    onSubmitForm={(e) => onSubmitForm(e)}
                    paymentType={paymentType}
                    setCallBack={(type) => setCallBack(type)}
                    setComment={(comment) => setComment(comment)}
                    setPaymentType={(type) => setPaymentType(type)}
                    price={price}
                ></PayMethodBlock>
            }
        </div>
    );
}