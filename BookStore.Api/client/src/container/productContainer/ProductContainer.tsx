import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productContainer.scss";
import "./carousel.scss";
import { Helmet } from "react-helmet-async";
import { Product } from "shared/models/product/Product";
import { TableSizesPopup } from "shared/components/popups/table-sizes-popup/TableSizesPopup";
import { DesignerSize } from "shared/models/designer/DesignerSize";
import { ProductType } from "shared/models/category/ProductType";
import { clickRequest } from "shared/services/CustomerClickService";
import 'pure-react-carousel/dist/react-carousel.es.css';
import { ClickType } from "shared/models/enums/ClickType";
import { ProductSizeForProduct } from "shared/models/product/ProductSizeForProduct";
import { BigPictureProduct } from "shared/components/popups/big-picture-product/BigPictureProduct";
import { MoreFromCategory } from "shared/components/more-from-category/MoreFromCategory";
import { ProductCarousel } from "./ProductCarousel";
import { ProductDescriptionComponent } from "./ProductDescriptionComponent";
import { MoreFromBrand } from "../../shared/components/more-from-brand/MoreFromBrand";
import { get } from "shared/services/HTTPUserService";

const ProductContainer = () => {
    const [product, setProduct] = useState<Product>();
    const [moreProductsFromBrand, setMoreProductsFromBrand] = useState<Product[]>([]);
    const [moreProductsFromCategory, setMoreProductsFromCategory] = useState<Product[]>([]);
    const [modalTableOpen, setTableOpen] = useState(false);
    const [designerSizes, setDesignerSizes] = useState<DesignerSize[]>([]);
    const [productSizes, setProductSizes] = useState<ProductSizeForProduct[]>([]);
    const [modalBigPictureProduct, setModalBigPictureProduct] = useState(false);

    useEffect(() => {
        getProduct();
    }, []);

    const { id } = useParams();

    const getProduct = () => {
        get(`Product/Get?id=${id}`).then((item: Product) => {
            setProduct(item);
            getAllProductSizes(item.id);
            getDesignerSizes(item.designer?.id!, item.type);
            onProductOpen();
            setTimeout(() => {
                getMoreFromBrand(item.designer?.id!);
                getMoreFromCategory(item.category?.id!);
            }, 700)
        });
    };

    const getAllProductSizes = (productId: string) => {
        get(`Size/GetAllProductSizes?productId=${productId}`)
            .then((response) => {
                setProductSizes(response);
            });
    };

    const getMoreFromBrand = (designerId: string) => {
        get(`Product/GetMoreFromBrand?id=${designerId}`)
            .then((response) => {
                setMoreProductsFromBrand(response);
            });
    };

    const getMoreFromCategory = (categoryId: string) => {
        get(`Product/GetMoreFromCategory?category=${categoryId}`)
            .then((response) => {
                setMoreProductsFromCategory(response);
            });
    };

    const getDesignerSizes = (designerId: string, type: ProductType) => {
        get(`DesignerSize/GetAllForProduct?designerId=${designerId}&type=${type}`)
            .then((response) => {
                setDesignerSizes(response);
            });
    }


    const onProductOpen = () => {
        const click = {
            city: "",
            country: "",
            ip: "",
            name: id,
            type: ClickType.OpenProduct,
            productType: ProductType.None
        };
        clickRequest("OpenProduct", click);
    }

    return (
        <>
            <Helmet>
                <title>{`${product?.name} | ${product?.color} | ${product?.designer?.firstName} ${product?.designer?.lastName}`}</title>
                <meta name="description" content={`${product?.description?.substring(0, 168)} Колір ${product?.color}.`} />
                <link rel="canonical" href={process.env.REACT_APP_URL + `product/${id}`} />
            </Helmet>
            <div className="product">
                <div className="container">
                    <div className="product__main">
                        <div className="product__left">
                            <ProductCarousel
                                productPicture={product?.pictures}
                                setModalBigPictureProduct={() => setModalBigPictureProduct(true)}
                                productName={product?.name}
                                productDescription={product?.description}
                            ></ProductCarousel>

                        </div>
                        {product &&
                            <ProductDescriptionComponent
                                product={product}
                                setTableOpen={() => setTableOpen(true)}
                                productSizes={productSizes}
                                designerSizes={designerSizes}
                                setProductSizes={setProductSizes}
                            ></ProductDescriptionComponent>
                        }
                    </div>
                    {product && <div className="product__padding">
                        <div className="footer__divider"></div>
                        <MoreFromBrand
                            product={product}
                            moreProductsFromBrand={moreProductsFromBrand}
                        ></MoreFromBrand>
                    </div>
                    }
                    {product?.category && <div className="product__padding">
                        <div className="footer__divider"></div>
                        <MoreFromCategory
                            categoryName={product?.category?.name}
                            categoryUrl={product?.category?.url}
                            moreProductsFromCategory={moreProductsFromCategory}
                        ></MoreFromCategory>
                    </div>}
                </div>
            </div>
            {product && <TableSizesPopup
                closeModal={() => setTableOpen(false)}
                designerName={product?.designer?.firstName + ' ' + product?.designer?.lastName}
                modalTableOpen={modalTableOpen}
                sizes={designerSizes}
                productType={product?.type}
            ></TableSizesPopup>
            }
            {product && <BigPictureProduct
                closeModal={() => setModalBigPictureProduct(false)}
                modalIsOpen={modalBigPictureProduct}
                product={product}
            ></BigPictureProduct>}
        </>
    )
}
export default ProductContainer;