import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./baner-carousel.scss";
import { Helmet } from "react-helmet-async";
import { openMainPage } from "shared/services/customer-services/click/click-service";
import { PrevComponent } from "./PrevComponent";
import { get } from "shared/services/HTTPUserService";
import { WebCarousel } from "./WebCarousel";
import { NewProductsComponent } from "./NewProductsComponent";
import { Magazine } from "shared/models/magazine/Magazine";
import { BlogCommponent } from "./BlogCommponent";
import mainBanner from '../../assets/icons/stock-photo-many-sorted-old-books-are.jpg';
import { GetAllBannerView } from "shared/models/banner/GetAllBannerView";
import { GetNewProductsView } from "shared/models/banner/GetNewProductsView";
import { GetPrevInfoView } from "shared/models/banner/GetPrevInfoView";

export const MainPageContainer = () => {
    const [banners, setBanners] = useState<GetAllBannerView>();
    const [articles, setArticles] = useState<Magazine[]>([]);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [moreNewProducts, setMoreNewProducts] = useState<GetNewProductsView>();
    const [prevInfo, setPrevInfo] = useState<GetPrevInfoView>();
    const [prevActive, setPrevActive] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if (ref.current) {
            const height = ref.current.offsetWidth * 0.59;
            setImageHeight(height);
            setImageWidth(ref.current.offsetWidth);
        }
    }, [ref])

    useEffect(() => {
        setTimeout(() => {
            setPrevActive(true);
            getPrevInfo();
        }, 50)
    }, []);


    const getPrevInfo = () => {
        get(`Product/GetPrevInfo`)
            .then((response) => {
                openMainPage();
                setTimeout(() => {
                    getNewProducts();
                    setPrevInfo(response);
                }, 900)
            });
    };
    const getAllBanners = () => {
        get(`Banner/GetAllForCustomer`)
            .then((response) => {
                setBanners(response);
                getArticles();
            });
    };

    const getNewProducts = () => {
        get(`Product/GetNewProducts`)
            .then((response) => {
                setMoreNewProducts(response);
                setTimeout(() => {
                    getAllBanners();
                }, 100)
            });
    };

    const getArticles = () => {
        get(`Magazine/GetAllForMainPage`)
            .then((response) => {
                setArticles(response);
            });
    };

    return (
        <>
            <Helmet>
                <meta name="description" content={prevInfo?.desc} />
                <link rel="canonical" href={process.env.REACT_APP_URL} />
            </Helmet>
            <div className="container">
                <div ref={ref} className="web-carousel">
                    <a href='/brand/magnetic' className="webCarousel__link">
                        <img
                            width={imageWidth}
                            height={imageHeight}
                            src={mainBanner}
                            alt={prevInfo?.mainBannerAlt}
                            className="logoMainPage"
                            title={prevInfo?.mainBannerDesc}
                        />
                    </a>
                </div>
                {prevActive && <PrevComponent info={prevInfo}></PrevComponent>}
                {moreNewProducts &&
                    <NewProductsComponent
                        products={moreNewProducts?.newProducts}
                    ></NewProductsComponent>
                }
                <div>
                    {banners &&
                        <WebCarousel
                            banners={banners.banners}
                        ></WebCarousel>
                    }
                </div>
                {articles.length > 0 &&
                    <BlogCommponent
                        articles={articles}
                    ></BlogCommponent>
                }
            </div>
        </>
    )
}
