import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import image from "../../assets/icons/holder.svg"
import './productList.scss'
import { Link } from "react-router-dom";
import { Product } from 'shared/models/product/Product';
import { ConfirmationPopup } from 'shared/components/popups/confirmation-popup/ConfirmationPopup';
import { deleteRequest } from 'shared/services/HTTPUserService';
import { post } from 'shared/services/Service';
import { ProductToUpdate } from 'shared/models/popups/product/ProductToUpdate';
import { BiSave } from "react-icons/bi";


interface Props {
    products: Product[];
    openUpdateModal: (designer: Product) => void;
    onDelete: (id: string) => void;
    refresh: () => void;
    setProducts: (products: Product[]) => void;
}

export const AdminProductList = (props: Props) => {
    const { products, openUpdateModal, onDelete, refresh, setProducts } = props;

    const [confirmation, setConfirmatin] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product>();

    const onDeleteProduct = (product: Product) => {
        setProductToDelete(product);
        setConfirmatin(true);
    }

    const deleteProduct = (id: string) => {
        deleteRequest(`Product/Delete?id=${id}`)
            .then(() => {
                setConfirmatin(false);
                refresh();
            });
    }

    const nameTypeProduct = (x: number) => {
        if (x == 1) {
            return "ОДЯГ";
        }
        else if (x == 2) {
            return "ВЗУТТЯ";
        }
        else {
            return "АКСЕСУАРИ"
        }
    }

    const setPrice = (price: number, item: Product, id: string) => {
        const newState = products.map(obj => {
            if (obj.id == id) {
                return { ...obj, price: price };
            }
            return obj;
        });
        setProducts(newState);
    }

    const setSalePrice = (salePrice: number, item: Product, id: string) => {
        const newState = products.map(obj => {
            if (obj.id == id) {
                return { ...obj, salePrice: salePrice };
            }
            return obj;
        });
        setProducts(newState);
    }

    const onSubmitForm = (product: Product) => {
        let productUpdate: ProductToUpdate = {
            id: product.id,
            isActive: product.isActive,
            name: product.name,
            type: product.type,
            color: product.color,
            article: product.article,
            url: product.url,
            description: product.description,
            price: product.price,
            status: product.status,
            style: 2,
            categoryId: product!.category!.id,
            designerId: product!.designer!.id,
            isDeleted: product.isDeleted,
            composition: product.composition,
            measurements: product.measurements,
            delivery: product.delivery,
            modelParameters: product.modelParameters,
            productParameters: product.productParameters,
            saleDate: new Date(product.saleDate!),
            code: product.code,
        };
        if (product.salePrice) {
            productUpdate.salePrice = product.salePrice;
        }

        if (product.salePrice == 0) {
            productUpdate.salePrice = undefined;
        }
        post(`Product/Update`, productUpdate)
            .then(() => {
                refresh();
            });
    }

    return (
        <>
            <table>
                <thead className="admin__header">
                    <tr className="admin__tableColor">
                        <th>БРЕНД</th>
                        <th>ФОТО</th>
                        <th>НАЗВА</th>
                        <th>ЦІНА</th>
                        <th>ЦІНА ЗІ ЗНИЖКОЮ</th>
                        <th>КАТЕГОРІЯ</th>
                        <th>ТИП ТОВАРУ</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, key) => (
                        <tr key={key} className="admin__tableColor">
                            <td><Link to={"/admin/product/" + item.url} className="admin__text">{item.designer?.firstName + " " + item.designer?.lastName}</Link></td>
                            <td><Link to={"/admin/product/" + item.url} className="admin__text">
                                <img src={item.pictures?.length ? item.pictures[0].imageUrl : image} className="admin__img" />
                            </Link>
                            </td>
                            <td><Link to={"/admin/product/" + item.url} className="admin__text">
                                {item.name}
                            </Link>
                                <div className="product-list__category">
                                    <Button variant="primary" onClick={() => openUpdateModal(item)}>Update</Button>
                                    <Button variant="danger" onClick={() => onDeleteProduct(item)} >Delete</Button>
                                </div>
                            </td>
                            <td>
                                <Form.Control
                                    type="price"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => setPrice(+e.target.value, item, item.id)}
                                />
                                <button onClick={() => onSubmitForm(item)}><BiSave /></button>
                            </td>
                            <td><Form.Control
                                type="price"
                                placeholder="Price"
                                value={item?.salePrice !== null ? item?.salePrice : "-"}
                                onChange={(e) => setSalePrice(+e.target.value, item, item.id)}
                            />
                                <button onClick={() => onSubmitForm(item)}><BiSave /></button>
                            </td>
                            <td><Link to={"/admin/product/" + item.url} className="admin__text">{item.category?.name}</Link></td>
                            <td><Link to={"/admin/product/" + item.url} className="admin__text">{nameTypeProduct(item.type)}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {productToDelete && <ConfirmationPopup onDelete={() => deleteProduct(productToDelete.url)} closeModal={() => setConfirmatin(false)} modalIsOpen={confirmation} product={productToDelete.name} ></ConfirmationPopup>}
        </>
    )
}