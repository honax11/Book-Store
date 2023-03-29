import "./emptyBagPopup.scss";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
}

export const EmptyBagPopup = (props: Props) => {
    const { modalIsOpen, closeModal } = props;

    return (
        <>
            <div className={modalIsOpen ? "modalWindow active" : "modalWindow"} onClick={() => closeModal()}>
                <div className={modalIsOpen ? "modalWindow__content active" : "modalWindow__content"} onClick={(e) => e.stopPropagation()}>
                    <div className="emptyBag__body">
                        <div>
                            <p className="emptyBag__text">
                                <div>
                                    Упс, ви видалили всі товари з замовлення.
                                </div>
                                <div className="emptyBag__pt">
                                    Оберіть товари, щоб створите нове
                                </div>
                            </p>
                        </div>

                        <div className="emptyBag__btnPosition">
                            <button className="btn btn-dark">
                                <Link to={"/"} className="emptyBag__btn">
                                    Назад до покупок
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}