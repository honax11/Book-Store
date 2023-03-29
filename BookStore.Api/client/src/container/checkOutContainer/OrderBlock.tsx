import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EmptyBagPopup } from "shared/components/popups/empty-bag-popup/EmptyBagPopup";
import { store, OrderProduct } from "store";

interface Props {
    totalPrice: number;
}

export const OrderBlock = (props: Props) => {
    const { totalPrice } = props;
    const [emptyBagOpen, setEmptyBagOpen] = useState(false);
    const globalState = useContext(store);

    const onDeleteProductFromShoppingCart = (product: OrderProduct) => {
        let tempState = { ...globalState.appState };
        tempState.products.map(item => {
            if (item.id == product?.id && item.size == product.size) {
                item.quantity -= 1;
            }
        });
        globalState.setAppState({ ...tempState });
        if (tempState.products.length == 1 && tempState.products[0].quantity == 0) {
            setEmptyBagOpen(true);
        }
    }

    const onAddProductToShoppingCart = (product: OrderProduct) => {
        let tempState = { ...globalState.appState };
        tempState.products.map(item => {
            if (item.id == product?.id && item.size == product.size) {
                item.quantity += 1;
            }
        });
        globalState.setAppState({ ...tempState });
    }

    const handleRemove = (productId: string, size: string) => {
        const newProducts = globalState.appState.products.filter(item => { return item.size != size })
        let tempState = { ...globalState.appState };
        tempState.products = newProducts;
        globalState.setAppState({ ...tempState });
        if (newProducts.length == 0) {
            setEmptyBagOpen(true);
        }
    };

    const goMainPage = () => {
        window.open(`/`, "_self");
    }

    return (
        <div className="cart-column">
            <div className="cart-column__wrapper">
                <div className="cart-column__content">
                    <div className="cart-column__checkout-header">
                        <p className="cart-column__font-family cart-column__margin16">
                            Ваше замовлення
                        </p>
                    </div>
                    <div className="cart-column__bottom">
                        {globalState.appState.products.map((product) => {
                            return (
                                <div className="cart-column__cart-item" key={product.name}>
                                    <Link to={"/product/" + product?.url} className="cart-column__productNameLink">
                                        <img className="cart-column__product-image" src={product.pictures[0]?.imageUrl} />
                                    </Link>
                                    <div className="cart-column__product-info">
                                        <div className="cart-column__quantity-and-price">
                                            <Link to={"/product/" + product?.url} className="cart-column__productNameLink">
                                                <p className="cart-column__product-name cart-column__productNameLink">{product.name}</p>
                                            </Link>
                                        </div>
                                        <div className="cart-column__quantity-products-price">
                                            <div className="cart-column__quantity-products">
                                                <p className="product-price-order">{product.sizeName}</p>
                                                <div className="correct-quantity">
                                                    <div onClick={() => onDeleteProductFromShoppingCart(product)} className="cart-column__quantity-products--minus"></div>
                                                    <p className="cart-column__quantity">
                                                        {`${product.quantity} ${product.quantity > 1 ? "шт." : "шт."
                                                            }`}
                                                    </p>
                                                    <div onClick={() => onAddProductToShoppingCart(product)} className="cart-column__quantity-products--plus"></div>
                                                </div>
                                            </div>
                                            {product.salePrice
                                                ?
                                                <p className="cart-column__amount">{product.quantity * product.salePrice} грн</p>
                                                :
                                                <p className="cart-column__amount">{product.quantity * product.price} грн</p>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="product-delete"
                                            onClick={() => handleRemove(product.id, product.size)}
                                        >
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="cart-column__divider--black"></div>
                </div>
                <div className="cart-column__delivery-and-buy">
                    <div className="cart-column__order-menu">
                        <p className="cart-column__font-family">Доcтавка:</p>
                        <p className="cart-column__font-family"> за тарифами перевізника</p>
                    </div>
                    <div className="cart-column__divider--black"></div>
                    <div className="cart-column__order-menu">
                        <p className="cart-column__font-family">Всього до сплати:</p>
                        <p className="cart-column__font-family"><b>{`${totalPrice} грн`}</b></p>
                    </div>
                    <div className="cart-column__divider--black"></div>
                </div>
            </div>
            <EmptyBagPopup closeModal={() => goMainPage()} modalIsOpen={emptyBagOpen}></EmptyBagPopup>
        </div>
    );
};