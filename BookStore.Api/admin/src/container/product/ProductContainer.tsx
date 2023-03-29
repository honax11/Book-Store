import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { UploadImageContainer } from "../../shared/components/popups/product/UploadImageContainer";
import { Carousel } from "react-responsive-carousel";
import { ProductSizeTable } from "../../shared/components/tables/ProductSizeTable";
import { Button } from "react-bootstrap";
import { showSuccess } from "shared/toast/notification";
import { getWithoutBody } from "shared/services/Service";
import { ProductSizeGetAllItem } from "shared/models/product/ProductSizeGetAllItem";
import { UploadFile } from "shared/models/product/UploadFile";
import { Product } from "shared/models/product/Product";
import { Size } from "shared/models/sizes/Size";
import { deleteRequest, get, upload } from "shared/services/HTTPUserService";
import "./productContainer.scss";

export const ProductContainer = () => {
    const [product, setProduct] = useState<Product>();
    const [sizes, setSizes] = useState<Size[]>();
    const [productSizes, setProductSizes] = useState<ProductSizeGetAllItem[]>();
    const [load, setLoad] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const { id } = useParams();

    useEffect(() => {
        getProduct();
    }, [])

    const uploadImages = () => {
        let pictureToCreate: UploadFile = {
            formFile: images[0],
            productId: product!.id
        }
        setLoad(true);
        upload(`Product/UploadImage`, pictureToCreate)
            .then(() => {
                showSuccess("Image was uploaded");
                setLoad(false);
                getProduct();
            });
    }

    const getAllSize = (type: number) => {
        get(`Size/GetAllForCategory?type=${type}`)
            .then((response) => {
                setSizes(response);
            });
    };

    const getAllProductSizes = (productId: string) => {
        get(`Size/GetAllProductSizes?productId=${productId}`)
            .then((response) => {
                setProductSizes(response);
            });
    };

    const onActivateProduct = (id: string) => {
        getWithoutBody(`Product/Activate?id=${id}`).then(() => {
            showSuccess(`Product ${!product?.isActive ? 'Activated!' : 'Deactivated!'}`);
            getProduct();
        });
    }

    const ondDeleteImage = (id: string) => {
        deleteRequest(`Product/DeleteProductPicture?id=${id}`)
            .then(() => {
                getProduct();
            })
    }

    const getProduct = () => {
        get(`Product/Get?id=${id}`)
            .then((item: Product) => {
                setProduct(item);
                getAllSize(item.type);
                getAllProductSizes(item.id);
            });
    };

    return (
        <div className="product__main">
            <div className="product__left">
                {product && product.pictures && <Carousel showStatus={false} className="main">
                    {
                        product.pictures.map(item => (
                            <div className="container" key={item.id}>
                                <img className="main__logo" src={item.imageUrl} />
                                <div>
                                    <Button className="btn btn-danger" onClick={() => ondDeleteImage(item.id)}>Delete</Button>
                                </div>
                            </div>
                        ))
                    }
                </Carousel>}
            </div>
            <div className="product__right">

                <div>
                    <p>{product?.designer?.firstName + ' ' + product?.designer?.lastName}</p>
                </div>

                <div>
                    <p>{product?.name}</p>
                </div>

                <div>
                    <p>{product?.price}</p>
                </div>

                <div>
                    <p>{product?.name}</p>
                </div>

                <div>
                    <p>{product?.description}</p>
                </div>

                <div>
                    <p>{product?.color}</p>
                </div>

                <div>
                    <p>{product?.article}</p>
                </div>

                <div>
                    <p>{product?.category?.name}</p>
                </div>

                <div>
                    <p>{product?.designer?.firstName + ' ' + product?.designer?.lastName}</p>
                </div>

                <div>
                    <UploadImageContainer load={load} upload={() => uploadImages()} images={images} setImages={setImages}></UploadImageContainer>
                </div>
                {product && sizes && productSizes &&
                    <ProductSizeTable
                        data={productSizes}
                        sizes={sizes}
                        productId={product?.id} refresh={() => getAllProductSizes(product?.id)}
                        setProductSizes={setProductSizes}
                    ></ProductSizeTable>
                }

                <div>
                    <p>Is Active: {product?.isActive ? 'Yes' : 'No'}</p>
                    <Button disabled={product?.isActive} className="btn btn-warning" onClick={() => onActivateProduct(product!.url)}>Activate</Button>
                    <Button disabled={!product?.isActive} className="btn btn-warning" onClick={() => onActivateProduct(product!.url)}>Deactivate</Button>
                </div>
            </div>
        </div>
    )
}