import React, { useContext } from "react";
import { OrderProduct, store } from "store";
import deleteProduct from '../../../../assets/icons/delete-product.png';

export const BagPreviewComponent = () => {
    const globalState = useContext(store);

    const handleRemove = (productId: string, size: string) => {
        const newProducts = globalState.appState.products.filter(item => { return item.size != size })
        let tempState = { ...globalState.appState };
        tempState.products = newProducts;
        globalState.setAppState({ ...tempState });
    };

    const onDeleteProductFromShoppingCart = (product: OrderProduct) => {
        let tempState = { ...globalState.appState };
        tempState.products.map(item => {
            if (item.id == product?.id && item.size == product.size) {
                item.quantity -= 1;
            }
        });
        globalState.setAppState({ ...tempState });
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

    return (
        <>
            {
                globalState.appState.products.length == 0
                    ?
                    <div className="cart-items__zero-products">Ваш кошик порожній :(</div>
                    :
                    ""
            }
            {globalState.appState.products.map((product: OrderProduct) => {
                return (
                    <li className="cart-item cart-item__item" key={product.id}>
                        <a href={"https://www.hubukrbrands.com/product/" + product?.url} className="productNameLink">
                            {product && <img className="product-image" src={product.pictures[0]?.imageUrl} alt="" />}
                        </a>
                        <div className="product-info">
                            <div className="product-and-remove">
                                <a href={"https://www.hubukrbrands.com/product/" + product?.url} className="productNameLink">
                                    <p className="product-name ">{product.name}</p>
                                </a>
                                <img
                                    className="deleteProductImg"
                                    src={deleteProduct}
                                    onClick={() => handleRemove(product.id, product.size)}
                                    alt=""
                                >
                                </img>
                            </div>
                            <div className="size-quant-price">
                                <p className="product-price">{product.sizeName}</p>
                                <div className="correct-quantity">
                                    <div onClick={() => onDeleteProductFromShoppingCart(product)} className="cart-item__quantity-products--minus"></div>
                                    <p className="quantity">
                                        {`${product.quantity == 0 ? handleRemove(product.id, product.size) : ""} ${product.quantity}  шт. `}
                                    </p>
                                    <div onClick={() => onAddProductToShoppingCart(product)} className="cart-item__quantity-products--plus"></div>
                                    <div className="product-total">
                                    </div>
                                </div>
                                {product.salePrice
                                    ?
                                    <p className="amount">{product.quantity * product.salePrice} грн</p>
                                    :
                                    <p className="amount">{product.quantity * product.price} грн</p>
                                }
                            </div>
                        </div>
                    </li>
                );
            })
            }
        </>
    )
}
