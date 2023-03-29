import React from "react";

interface Props {
    street: string;
    validation: Boolean;
    setStreet: (street: string) => void;
    house: string;
    setHouse: (house: string) => void;
    appartment: string;
    setAppartment: (appartment: string) => void;
}

export const StreetBlock = (props: Props) => {
    const { street, house, appartment, validation,
        setStreet, setHouse, setAppartment, } = props;
    return (
        <div className="check-out-element-width">
            <div className="mb-3" >
                <label className={`${validation || street ? '' : 'validation-color'}`}>Вулиця*</label>
                <input
                    className="form-control-back-ground inputStyle"
                    placeholder="Вулиця"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
            </div>
            <div className="mb-3 home-and-flat ">
                <div className="home-and-flat__home">
                    <label className={`${validation || house ? '' : 'validation-color'}`}>Будинок*</label>
                    <input
                        className="form-control-back-ground home-and-flat__position-home inputStyle"
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}
                    />
                </div>
                <div className="home-and-flat__flat">
                    <label>Квартира</label>
                    <input
                        className="form-control-back-ground home-and-flat__position-flat inputStyle"
                        value={appartment}
                        onChange={(e) => setAppartment(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}