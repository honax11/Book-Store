import React, { useState } from "react";
import { ReportProductAvailability } from "shared/models/product/ReportProductAvailability";
import { postNoBody } from "shared/services/HTTPUserService";
import { showInfo } from "shared/toast/notification";
import "./reportAvailability.scss";

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    prodctId: string | undefined;
    productName: string | undefined;
}

export const ReportAvailability = (props: Props) => {
    const { modalIsOpen, closeModal, prodctId, productName } = props;
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [validation, setValidation] = React.useState(true);

    const onSubmitForm = () => {

        let reportProductAvailability: ReportProductAvailability = {
            name: name,
            email: email,
            phone: phone,
            productId: prodctId!,
            productName: productName!,
        }

        postNoBody(`Ask/ReportProductAvailability`, reportProductAvailability)
            .then(() => {
                closeModal();
            });
    }

    const onPressNext = (event: any) => {
        event.preventDefault();
        if (isEmptyOrSpaces(name)) {
            setValidation(false);
            showInfo("Заповніть особисті дані");
            return;
        }
        if ((validatePhone(phone) || validateEmail(email)) == false) {
            setValidation(false);
            showInfo("Заповніть особисті дані");
            return;
        }
        setValidation(true);
        onSubmitForm();
    }

    const isEmptyOrSpaces = (str: string): boolean => {
        return str === undefined || str.match(/^ *$/) !== null;
    }
    const validateEmail = (userOption: string) => {
        let checker = /\S+@\S+\.\S+/;
        return checker.test(userOption);
    }
    const validatePhone = (userOption: string) => {
        let checker = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return checker.test(userOption);
    }

    return (
        <div>
            <>
                <div className={modalIsOpen ? "modalWindow active" : "modalWindow"} onClick={() => closeModal()}>
                    <div className={modalIsOpen ? "modalWindow__content active reportAvailability__width" : "modalWindow__content reportAvailability__width"} onClick={(e) => e.stopPropagation()}>
                        <div className="reportAvailability">
                            <div className="reportAvailability__header">
                                <p className="reportAvailability__headerText">Повідомити про наявність</p>
                                <button className="btn-close" onClick={() => closeModal()}></button>
                            </div>

                            <div className="reportAvailability__body">
                                <p className="reportAvailability__bodyText">
                                    Вкажіть номер телефону або e-mail
                                    і ми повідомимо вас, коли обранний товар буде у наявності
                                </p>

                                <p className={`${validation || name.length > 0 ? 'reportAvailability__bodyInputText' : 'reportAvailability__bodyInputText validation-color'}`}>Ім'я*</p>
                                <input placeholder="Ім'я" type="text" className="reportAvailability__input" onChange={(e) => setName(e.target.value)} />

                                <p className={`${validation || phone.length > 8 ? 'reportAvailability__bodyInputText' : 'reportAvailability__bodyInputText validation-color'}`}>Номер телефону</p>
                                <input placeholder="Номер" type="text" className="reportAvailability__input" onChange={(e) => setPhone(e.target.value)} />

                                <p className={`${validation || email.length > 10 ? 'reportAvailability__bodyInputText' : 'reportAvailability__bodyInputText validation-color'}`}>E-mail</p>
                                <input placeholder="E-mail" type="text" className="reportAvailability__input" onChange={(e) => setEmail(e.target.value)} />

                            </div>

                            <div className="reportAvailability__footer">
                                <button className="btn-dark" onClick={onPressNext}>
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}