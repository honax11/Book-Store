import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ReportAvailability } from "shared/components/popups/report-availability/ReportAvailability";
import { ProductType } from "shared/models/category/ProductType";
import { DesignerSize } from "shared/models/designer/DesignerSize";
import { Product } from "shared/models/product/Product";
import { ProductAddedToCart } from "shared/models/product/ProductAddedToCart";
import { ProductSizeForProduct } from "shared/models/product/ProductSizeForProduct";
import { preOrderedRequest } from "shared/services/CustomerClickService";
import { showSuccess, showWarn } from "shared/toast/notification";
import { store } from "store";

export interface Props {
    product: Product;
    setTableOpen: () => void;
    productSizes: ProductSizeForProduct[];
    designerSizes: DesignerSize[];
    setProductSizes: (sizes: ProductSizeForProduct[]) => void;
}

export const ProductDescriptionComponent = (props: Props) => {
    const { product, setTableOpen, productSizes, setProductSizes, designerSizes } = props;

    const [size, setSize] = useState<string>();
    const globalState = useContext(store);
    const [reportAvailability, setReportAvailability] = useState(false);

    const onAddProductToShoppingCart = () => {
        if (!size) {
            showWarn('Оберіть розмір, будь-ласка');
            return;
        }
        let tempState = { ...globalState.appState };
        const existingProd = tempState.products.find(item => {
            return item.id == product?.id && item.size == size
        });
        logCustomInfor(product?.name!);
        if (existingProd) {
            tempState.products.map(item => {
                if (item.id == product?.id && item.size == size) {
                    item.quantity += 1;
                }
            })
        }
        else {
            tempState.products.push({
                id: product!.id,
                name: product!.name,
                url: product!.url,
                pictures: product?.pictures!,
                salePrice: product!.salePrice!,
                price: product!.price,
                quantity: 1,
                size: size!,
                sizeName: productSizes.find(x => x.id == size)?.size.name!
            });
        }
        globalState.setAppState({ ...tempState });
        onAddedBag(product!.name);
    }

    const logCustomInfor = (name: string) => {
        const user: ProductAddedToCart = {
            city: "",
            country: "",
            ip: "",
            id: product?.id!,
            name: product?.name!
        };
        preOrderedRequest("AddProductToCart", user);
    }

    const onAddedBag = (name: string) => {
        showSuccess(`Товар ${name} у кошику`);
    }

    const onSetSize = (id: string) => {
        const tempSizes = [...productSizes];
        tempSizes.map(item => {
            if (item.id == id) {
                item.isActive = true;
            }
            else {
                item.isActive = false;
            }
        });
        setProductSizes(tempSizes);
        setSize(id);
    }

    return (
        <>
            <div className="product__right">
                <h1 className="product__name">{product?.name}</h1>

                <div className="product__price-sale">
                    <p className={`product__price ${product?.salePrice ? 'product__price-old' : ''} `}>{product?.price} грн</p>
                    {product?.salePrice && <p className="product__price-new">{product?.salePrice} грн</p>}
                </div>

                <ul className="product__sizes">
                    {productSizes?.map(item => {
                        return (
                            item.quantity == 0 ?
                                <div key={`${item.id}${item?.size?.name}`} className="tooltip">
                                    <p className="product__size--inactive "><b>{item.size.name}</b></p>
                                    <span className="tooltiptext">Немає в наявності</span>
                                </div>
                                :
                                <li key={item.id} className="size-color">
                                    <p className={`product__size--active ${item.isActive ? 'active-size-buttom' : ''}`} onClick={() => onSetSize(item.id)}><b>{item.size.name}</b></p>
                                </li>
                        )
                    })}

                </ul>
                {designerSizes.length > 0 && <p
                    onClick={() => setTableOpen()}
                    className="product__color-grey-table"
                >Таблиця розмірів</p>}
                {product?.isActive == false || productSizes?.every(x => x.quantity == 0) ?
                    <div className="product__btn">
                        <button className="product__btn-btn btn-gray" type="button" onClick={() => setReportAvailability(true)}>Повідомити про наявність</button>
                    </div>
                    :
                    <div className="product__btn">
                        <button className="product__btn-btn btn-dark" type="button" onClick={onAddProductToShoppingCart}>Додати в кошик</button>
                    </div>
                }
                <h2 className="product__description">{product?.description}</h2>
                {product?.composition && <h3 className="mb-1 product__font14"><b>Склад:</b> {product?.composition}</h3>}
                {product?.measurements && <h3 className="mb-1 product__font14"><b>Догляд:</b> {product?.measurements}</h3>}
                {product?.productParameters && <h3 className="mb-1 product__font14"><b>Заміри виробу:</b> {product?.productParameters}</h3>}
                {product?.modelParameters && <h3 className="mb-1 product__font14"><b>Параметри моделі:</b> {product?.modelParameters}</h3>}
                {product?.delivery && <h3 className="mb-1 product__param-model product__font14"><b>Доставка:</b> {product?.delivery}</h3>}
                <div className="product__greyLine">
                    {product?.color && <h4 className="product__color-grey">Колір: {product?.color}</h4>}
                    {product?.article && <h4 className="product__color-grey"> Артикул: {product?.article}</h4>}
                    {product?.code != undefined && product?.code > 0 && <div className="product__color-grey"> Код: {product?.code} </div>}
                    {product?.category?.name && <Link to={`/${ProductType[product?.type ? product?.type : 0].toLowerCase()}/${product?.category?.url}`} className="product__none">
                        <h4 className="product__color-grey">Категорія: {product?.category?.name}</h4>
                    </Link>}
                    {product?.designer?.firstName + ' ' + product?.designer?.lastName && <Link to={`/brand/${product?.designer?.url}`} className="product__none"><h4 className="product__color-grey">Бренд: {product?.designer?.firstName + ' ' + product?.designer?.lastName} </h4></Link>}
                </div>
            </div>
            <ReportAvailability
                closeModal={() => setReportAvailability(false)}
                modalIsOpen={reportAvailability}
                prodctId={product?.id}
                productName={product?.name}
            ></ReportAvailability>
        </>
    )
}