import React from "react";
import "../in-development-popup/in-development-popup.scss";
import "./successfulCheckOrderPopup.scss"

interface Props {
    numberOrder: string;
    modalIsOpen: boolean;
    closeModal: () => void;
}

export const SuccessfulCheckOrderPopup = (props: Props) => {
    const { numberOrder, modalIsOpen, closeModal } = props;

    return (
        <>
            <div className={modalIsOpen ? "modalWindow active" : "modalWindow"} onClick={() => closeModal()}>
                <div className={modalIsOpen ? "modalWindow__content active" : "modalWindow__content"} onClick={(e) => e.stopPropagation()}>
                    <div className="successful__body">
                        <div >
                            <p className="popup__text"> Вітаємо! Ваше замовлення №{numberOrder} - прийнято.</p>
                        </div>
                        <div>
                            <button onClick={closeModal} className="btn btn-dark">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}