import React, { useContext } from "react";
import { store } from "store";
import { useNavigate } from "react-router-dom";
import "./bagPreview.scss";
import { preOrderedRequest } from "shared/services/CustomerClickService";
import { BagPreviewComponent } from "./BagPreviewComponent";

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
}

export const BagPreview = (props: Props) => {
    const { modalIsOpen, closeModal } = props;

    const globalState = useContext(store);
    let navigate = useNavigate();


    const handleProceedCheckout = () => {
        let tempState = { ...globalState.appState };
        tempState.isShopingCartOpen = false;
        globalState.setAppState({ ...tempState });
        logPressCheckOut();
        closeModal();
        navigate('/check-out');
    };

    const logPressCheckOut = () => {
        const products = globalState.appState.products.map(item => {
            return {
                city: "",
                country: "",
                ip: "",
                id: item.id,
                name: item?.name
            }
        })
        preOrderedRequest("PressCheckOut", products);
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
        }
        return total;
    }

    return (
        <>
            <div className={modalIsOpen ? "modalWindow active" : "modalWindow"} onClick={() => closeModal()}>
                <div className={modalIsOpen ? "modalWindow__content active popupBag__width" : "modalWindow__content popupBag__width"} onClick={(e) => e.stopPropagation()}>
                    <div className="popupBag__body">
                        <div>
                            {globalState.appState.products.length > 0
                                ?
                                <p className="cart-preview__youChoosed">Ви обрали:</p>
                                :
                                ''
                            }
                            <ul className="cart-items">
                                <BagPreviewComponent
                                ></BagPreviewComponent>
                            </ul>
                            <div>
                                {globalState.appState.products.length > 0
                                    ?
                                    <div>
                                        <div className="cart-preview__divider"></div>
                                        <div className="cart-preview__total">Всього:<b>{sumTotalPrice()} грн</b></div>
                                    </div>
                                    :
                                    ''
                                }


                                <div className="action-block">
                                    {
                                        globalState.appState.products.length == 0
                                            ?
                                            <button
                                                type="button"
                                                className="product__btn-btn2 btn-dark"
                                                onClick={closeModal}
                                            >
                                                Продовжити покупки
                                            </button>
                                            :
                                            <button
                                                type="button"
                                                className="product__btn-btn2 btn-dark"
                                                onClick={handleProceedCheckout}
                                                disabled={globalState.appState.products.length == 0}
                                            >
                                                Замовити
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}