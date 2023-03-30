import { IKImage } from 'imagekitio-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'shared/models/product/Product';
import "./productList.scss";

interface Props {
    products: Product[];
    onBottomHit: () => void;
    isLoading: boolean;
    hasMoreData: boolean;
    loadOnMount: boolean;
}

const isBottom = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) {
        return false;
    }
    return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

export const ProductList = (props: Props) => {
    const { products, onBottomHit, isLoading, hasMoreData, loadOnMount } = props;

    const contentRef = useRef<HTMLDivElement>(null);
    const [initialLoad, setInitialLoad] = useState(true);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [transformImageWidth, setTransformImageWidth] = useState(0);
    const [transformImageHeight, setTransformImageHeight] = useState(0);

    useEffect(() => {
        if (loadOnMount && initialLoad) {
            //onBottomHit();
            setInitialLoad(false);
        }
    }, [onBottomHit, loadOnMount, initialLoad]);


    useEffect(() => {
        if (contentRef.current) {
            if (window.innerWidth < 577) {
                const width = (window.innerWidth - 74) / 2;
                const height = width * 1.373;
                setTransformImageHeight(height * 2 - 2);
                setTransformImageWidth(width * 2 + 3);

                setImageHeight(height);
                setImageWidth(width - 1);
            }
            else {
                let width = contentRef.current.offsetWidth / 4;
                const height = width * 1.37;
                width = width - 16;
                setTransformImageHeight(height * 2);
                setTransformImageWidth(width * 2);

                setImageHeight(height);
                setImageWidth(width);
            }
        }
    }, [])

    useEffect(() => {
        const onScroll = () => {
            if (!isLoading && hasMoreData && isBottom(contentRef)) {
                onBottomHit();
            }
        };
        document.addEventListener('scroll', onScroll);
        return () => document.removeEventListener('scroll', onScroll);
    }, [onBottomHit, isLoading, hasMoreData]);

    return (
        <div ref={contentRef} className="product-list">
            {products.map(item => (
                <Link to={"/product/" + item.url} className="product-list__text" key={item.id}>
                    {
                        <IKImage
                            urlEndpoint='https://ik.imagekit.io/mlrsaclra/'
                            path={item.pictures?.length ? item.pictures[0].imageUrl.substring(57) : ""}
                            className={`card-img-top product-list__img ${isLoading ? 'img-border-radious' : ''}`}
                            alt={item.name}
                            height={imageHeight}
                            width={imageWidth}
                            title={item.description}
                            lqip={{ active: true }}
                            transformation={[{
                                height: transformImageHeight,
                                width: transformImageWidth
                            }]}
                        />}
                    <div className="product-list__category-brand">{item.designer?.firstName + ' ' + item.designer?.lastName}</div>

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
                </Link>
            ))}
        </div>
    )
}