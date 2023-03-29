import { Product } from "shared/models/product/Product";
import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./newProductsComponent.scss";

export interface Props {
    products: Product[];
}
export const NewProductsComponent = ({ products }: Props) => {
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    useLayoutEffect(() => {
        if (window.innerWidth > 540) {
            const height = 230 * 1.37;
            setImageHeight(height + 1);
            setImageWidth(230);
        } else {
            const height = 140 * 1.37;
            setImageHeight(height);
            setImageWidth(140);
        }
    }, []);
    const onOpenProduct = (productUrl: string) => {
        window.open(productUrl, "_self");
    }

    return (
        <>
            <div className="newProduct">
                <div>
                    <h2 className="newProduct__title">НОВИНКИ</h2>
                    <p className="newProduct__text">Будь в курсі нових коллекцій від українських брендів</p>
                </div>
                <div className="previu">
                    {products.map(item => (
                        <div key={item.id} onClick={() => onOpenProduct(`/product/${item.url}`)} className="previu__item">
                            {item?.pictures &&
                                <img
                                    alt={item.name}
                                    title={item.description}
                                    className="previu__img"
                                    width={imageWidth}
                                    height={imageHeight}
                                    src={`https://ik.imagekit.io/mlrsaclra/tr:h-${imageHeight},w-${imageWidth}/` + item?.pictures[0]?.imageUrl.substring(57)}
                                />
                            }
                            <div className="product-list__category-brand">{item?.designer?.firstName + ' ' + item?.designer?.lastName}</div>
                            <div className="product-list__text">
                                <h2 className="product-list__category-name">{item.name}</h2>
                                {item.salePrice ?
                                    <div className='product-list__flex'>
                                        <div className="product-list__category-price">{item.price} грн </div>
                                        <div className="product-list__category-sale">{item.salePrice} грн</div>
                                    </div>
                                    :
                                    <div className="product-list__category">{item.price} грн </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <div className="article__article">
                    <button className="article__btnNext">
                        <Link to={`/clothes`} className="article__btn">
                            Дивитись всі новинки
                        </Link>
                    </button>
                </div>
            </div>
        </>
    )
}