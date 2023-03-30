import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "shared/models/product/Product";

export interface Props {
    product: Product;
    moreProductsFromBrand: Product[];
}

export const MoreFromBrand = (props: Props) => {
    const { product, moreProductsFromBrand, } = props;

    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [transformImageWidth, setTransformImageWidth] = useState(0);
    const [transformImageHeight, setTransformImageHeight] = useState(0);

    useLayoutEffect(() => {
        if (window.innerWidth > 540) {
            const height = 230 * 1.37;
            setImageHeight(height);
            setTransformImageHeight(632);
            setImageWidth(295);
            setTransformImageWidth(460);
        } else {
            const height = 140 * 1.37;
            setImageHeight(height);
            setTransformImageHeight(height * 2);
            setImageWidth(140);
            setTransformImageWidth(140 * 2)
        }
    }, []);

    const onOpenProduct = (productUrl: string) => {
        window.open(`/product/${productUrl}`, "_self");
    }

    return (
        <>
            {product?.designer && <div>Ще від бренду <Link to={"/brand/" + product?.designer?.url} className="previu__nameBrand"><b>{product?.designer?.firstName + ' ' + product?.designer?.lastName}</b></Link></div>}
            <div className="previu">
                {moreProductsFromBrand.map(item => (
                    <div key={item.id} onClick={() => onOpenProduct(item.url)} className="previu__item">
                        {item?.pictures &&
                            <img
                                className="previu__img"
                                alt={item.name}
                                title={item.description}
                                width={imageWidth}
                                height={imageHeight}
                                src={`https://ik.imagekit.io/mlrsaclra/tr:h-${transformImageHeight},w-${transformImageWidth}/` + item?.pictures[0]?.imageUrl.substring(57)}
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
                ))
                }
            </div>
        </>
    )
}