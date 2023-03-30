import React from "react";
import "./inputStyle.scss";

interface Props {
    validation: boolean;
    firstName: string;
    setFirstName: (type: string) => void;
    phone: string;
    setPhone: (comment: string) => void;
    lastName: string;
    setLastName: (comment: string) => void;
    email: string;
    setEmail: (comment: string) => void;
    onPressNext: (next: boolean) => void;
}

export const PersonalInfoBlock = (props: Props) => {
    const { firstName, phone, lastName, validation, email,
        setPhone, setLastName, setFirstName, setEmail, onPressNext } = props;

    return (
        <div className="padinglr">
            <div>
                <div className="margin-bottom" >
                    <div>
                        <div>
                            <label className={`${validation || firstName.length > 0 ? '' : 'validation-color'}`}>Ім'я*</label>
                            <input
                                className="form-control-back-ground payment-margin-bottom inputStyle"
                                placeholder="Ім'я"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`${validation || lastName.length > 0 ? '' : 'validation-color'}`}>Прізвище*</label>
                            <input
                                className="form-control-back-ground payment-margin-bottom inputStyle"
                                placeholder="Прізвище"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="margin-bottom">
                    <div>
                        <div>
                            <label className={`${validation || phone.length > 8 ? '' : 'validation-color'}`}>Телефон*</label>
                            <input
                                className="form-control-back-ground payment-margin-bottom inputStyle"
                                placeholder="Телефон"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className={`${validation || email.length > 10 ? '' : 'validation-color'}`}>Email*</label>
                            <input
                                className="form-control-back-ground payment-margin-bottom inputStyle"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="btnNextMobile">
                <button className="btn btn-dark btnNextPayment" onClick={() => onPressNext(true)}>Далі</button>
            </div>
        </div>
    )
}