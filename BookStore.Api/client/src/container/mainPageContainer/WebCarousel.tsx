import React, { useLayoutEffect, useState } from "react";
import { GetAllBannerViewItem } from "shared/models/banner/GetAllBannerViewItem";
import { ProductType } from "shared/models/category/ProductType";
import { ClickType } from "shared/models/enums/ClickType";
import { clickRequest } from "shared/services/CustomerClickService";
import "./webCarousel.scss"

export interface Props {
    banners: GetAllBannerViewItem[];
}

export const WebCarousel = (props: Props) => {
    const { banners } = props;
    const [imageWidth, setImageWidth] = useState(230);
    const [imageHeight, setImageHeight] = useState(316);
    const [mainImageWidth, setMainImageWidth] = useState(464);
    const [mainImageHeight, setMainImageHeight] = useState(272);
    const [transformImageWidth, setTransformImageWidth] = useState(0);
    const [transformImageHeight, setTransformImageHeight] = useState(0);

    useLayoutEffect(() => {
        if (window.innerWidth > 540) {
            const height = 230 * 1.37;
            setTransformImageHeight(height + 90);
            setTransformImageWidth(295);
        } else {
            const height = 140 * 1.37;
            setTransformImageHeight(height);
            setTransformImageWidth(140);

            setImageWidth(140);
            setImageHeight(height);

            const mobileMainImgWidth = window.innerWidth - 68;
            setMainImageWidth(mobileMainImgWidth);
            setMainImageHeight(mobileMainImgWidth * 0.586 + 16);
        }
    }, []);
    const onOpenProduct = (productUrl: string) => {
        window.open(`/product/${productUrl}`, "_self");
    }

    const onBannerClick = (url: string) => {
        const click = {
            city: "",
            country: "",
            ip: "",
            name: url.substring(8),
            type: ClickType.PressOnBanner,
            productType: ProductType.None
        };
        clickRequest("PressOnBanner", click);
        window.open(url, "_self");
    }

    return (
        <>
            {banners.map((banner, key) => (
                <div key={key}>
                    <div className={`webCarousel ${key % 2 === 0 ? 'webCarousel__left' : 'webCarousel__flexReverse'}`}>
                        <div className={`webCarousel__imgWidth ${key % 2 === 0 ? 'webCarousel__left' : 'webCarousel__right'}`}>
                            <a onClick={() => onBannerClick(banner.productUrl!)} href={banner.productUrl} className="webCarousel__link">
                                <img
                                    alt={banner.name}
                                    title={banner.description}
                                    height={309}
                                    width={527}
                                    className={`webCarousel__img ${key % 2 === 0 ? 'webCarousel__paddingLeft0' : 'webCarousel__paddingLeft80'}`}
                                    src={`https://ik.imagekit.io/mlrsaclra/tr:h-${309},w-${527}/` + banner.url.substring(57)}
                                />
                            </a>
                        </div>
                        <div className={`webCarousel__information ${key % 2 === 0 ? 'webCarousel__paddingLeft80' : 'webCarousel__paddingLeft0'}`}>
                            <a onClick={() => onBannerClick(banner.productUrl!)} href={banner.productUrl} className="webCarousel__link">
                                <h2
                                    className="webCarousel__title"
                                >{banner.name}</h2>
                            </a>
                            <p className="webCarousel__text">{banner.description}</p>
                        </div>
                    </div>

                    <div className="webCarouselMobile">
                        <div className="webCarousel__left">
                            <a onClick={() => onBannerClick(banner.productUrl!)} href={banner.productUrl} className="webCarousel__link">
                                <h2 className="webCarousel__title">{banner.name}</h2>
                            </a>
                            <a onClick={() => onBannerClick(banner.productUrl!)} href={banner.productUrl} className="webCarousel__link">
                                <img
                                    alt={banner.name}
                                    title={banner.name}
                                    height={mainImageHeight}
                                    width={mainImageWidth}
                                    className="webCarousel__img"
                                    src={`https://ik.imagekit.io/mlrsaclra/tr:h-${272},w-${464}/` + banner.url.substring(57)}
                                />
                            </a>
                            <p className="webCarousel__text">{banner.description}</p>
                        </div>
                    </div>

                    <div className="webCarousel__previu previu">
                        {banner.products.map(item => (
                            <div key={item.id} onClick={() => onOpenProduct(item.url)} className="previu__item">
                                {item?.pictures &&
                                    <img
                                        alt={item.name}
                                        title={item.description}
                                        className="previu__img"
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
                        ))}
                    </div>

                    <div className="article__article">
                        <button className="article__btnNext">
                            <a href={banner.productUrl ? banner.productUrl : '/'}
                                className="article__btn"
                            >{banner.name}</a>
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}