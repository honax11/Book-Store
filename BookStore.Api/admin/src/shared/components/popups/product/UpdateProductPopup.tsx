import React from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { post } from 'shared/services/Service';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Category } from 'shared/models/category/Category';
import { ProductType } from 'shared/models/category/ProductType';
import { Designer } from 'shared/models/designer/Designer';
import { Product } from 'shared/models/product/Product';
import { ProductToUpdate } from 'shared/models/popups/product/ProductToUpdate';
import "./updateProductPopup.scss"
import { ProductStatus } from 'shared/models/enums/ProductStatus';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    refresh: () => void;
    product: Product;
    setProduct: (designer: Product) => void;
    categories: Category[];
    designers: Designer[];
}

export const UpdateProductPopup = (props: Props) => {
    const { modalIsOpen, closeModal, categories, product, setProduct, designers, refresh } = props;

    const setName = (name: string) => {
        setProduct({ ...product, name });
    }

    const setPrice = (price: number) => {
        setProduct({ ...product, price });
    }

    const setSaleDate = (saleDate: Date) => {
        setProduct({ ...product, saleDate });
    }

    const setSalePrice = (salePrice: number) => {
        setProduct({ ...product, salePrice });
    }
    const setComposition = (composition: string) => {
        setProduct({ ...product, composition });
    }
    const setMeasurements = (measurements: string) => {
        setProduct({ ...product, measurements });
    }
    const setDelivery = (delivery: string) => {
        setProduct({ ...product, delivery });
    }
    const setArticle = (article: string) => {
        setProduct({ ...product, article });
    }
    const setCode = (code: number) => {
        setProduct({ ...product, code });
    }
    const setUrl = (url: string) => {
        setProduct({ ...product, url });
    }
    const setModelParameters = (modelParameters: string) => {
        setProduct({ ...product, modelParameters });
    }
    const setProductParameters = (productParameters: string) => {
        setProduct({ ...product, productParameters });
    }

    const setColor = (color: string) => {
        setProduct({ ...product, color });
    }
    const setDescription = (description: string) => {
        setProduct({ ...product, description });
    }

    const setDesignerSelect = (designerId: string) => {
        const newDesigner = designers.filter(item => {
            return item.id == designerId;
        });
        let newProd = { ...product };
        newProd.designer = newDesigner[0];
        setProduct(newProd);
    }

    const setCategorySelect = (categoryId: string) => {
        const newCategory = categories.filter(item => {
            return item.id == categoryId;
        });
        let newProd = { ...product };
        newProd.category = newCategory[0];
        setProduct(newProd);
    }

    const onHandleStatusSelect = (status: number) => {
        setProduct({ ...product, status });
    }

    const onHandleTypeSelect = (type: number) => {
        setProduct({ ...product, type });
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();

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
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                {/* <Modal.Header closeButton>
                        <Modal.Title className="d-flex justify-content-center">Update Product</Modal.Title>
                </Modal.Header> */}
                <Modal.Body className="popupUpdate__body">

                    <Modal.Title className="d-flex justify-content-center">Update Product</Modal.Title>
                    <div className="d-flex justify-content-between">
                        <Form className="popupUpdate__miniBody">

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Row>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                        <Form.Select as="select" value={product?.type} onChange={(e) => onHandleTypeSelect(+e.target.value)}>
                                            <option key={ProductType.Clothes} value={ProductType.Clothes} >Clothes</option>
                                            <option key={ProductType.Shose} value={ProductType.Shose} >Shose</option>
                                            <option key={ProductType.Accessories} value={ProductType.Accessories} >Accessories</option>
                                        </Form.Select>
                                    </Col>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                        <Form.Select as="select" value={product.status} onChange={(e) => onHandleStatusSelect(+e.target.value)}>
                                            <option key={ProductStatus.OutOfStock} value={ProductStatus.OutOfStock} >OutOfStock</option>
                                            <option key={ProductStatus.InStock} value={ProductStatus.InStock} >InStock</option>
                                            <option key={ProductStatus.RunningLow} value={ProductStatus.RunningLow} >RunningLow</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Row>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                        <Form.Select as="select" value={product.category?.id} onChange={(e) => setCategorySelect(e.target.value)}>
                                            {categories.map(item => {
                                                return <option key={item.id} value={item.id} >{item.name}</option>
                                            })}
                                        </Form.Select>
                                    </Col>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                        <Form.Select as="select" value={product.designer?.id} onChange={(e) => setDesignerSelect(e.target.value)}>
                                            {designers.map(item => {
                                                return <option key={item.id} value={item.id} >{item.firstName + ' ' + item.lastName}</option>
                                            })}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput4">
                                <Form.Label className="mb-0">Name</Form.Label>
                                <Form.Control as="textarea" type="name" placeholder="Name" autoFocus value={product.name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput6">
                                <Form.Label className="mb-0">Color</Form.Label>
                                <Form.Control placeholder="Color" value={product.color} onChange={(e) => setColor(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput7">
                                <Form.Label className="mb-0">Article</Form.Label>
                                <Form.Control type="article" placeholder="Article" value={product.article} onChange={(e) => setArticle(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput7">
                                <Form.Label className="mb-0">Код</Form.Label>
                                <Form.Control type="article" placeholder="Код" value={product.code} onChange={(e) => setCode(+e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput7">
                                <Form.Label className="mb-0">Product Url</Form.Label>
                                <Form.Control type="ProductUrl" placeholder="Product Url" value={product.url} onChange={(e) => setUrl(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput8">
                                <Form.Label className="mb-0">Price</Form.Label>
                                <Form.Control type="price" placeholder="Price" value={product.price} onChange={(e) => setPrice(+e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput8">
                                <Form.Label className="mb-0">Sale Price</Form.Label>
                                <Form.Control type="salePrice" placeholder="Sale Price" value={product.salePrice} onChange={(e) => setSalePrice(+e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput12">
                                <Form.Label className="mb-0">Sale Date</Form.Label>
                                <DatePicker selected={product.saleDate} onChange={(date: Date) => setSaleDate(date)} />
                            </Form.Group>

                        </Form>

                        <Form className="ps-3 popupUpdate__miniBody">

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput5">
                                <Form.Label className="mb-0">Description</Form.Label>
                                <Form.Control as="textarea" rows={2} type="description" placeholder="Description" value={product.description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput9">
                                <Form.Label className="mb-0">Composition</Form.Label>
                                <Form.Control as="textarea" rows={2} type="composition" placeholder="Composition" value={product.composition} onChange={(e) => setComposition(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput10">
                                <Form.Label className="mb-0">Measurements</Form.Label>
                                <Form.Control as="textarea" rows={2} type="measurements" placeholder="Measurements" value={product.measurements} onChange={(e) => setMeasurements(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput10">
                                <Form.Label className="mb-0">Delivery</Form.Label>
                                <Form.Control as="textarea" rows={1} type="delivery" placeholder="Delivery" value={product.delivery} onChange={(e) => setDelivery(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput10">
                                <Form.Label className="mb-0">Model Parameters</Form.Label>
                                <Form.Control as="textarea" rows={2} type="modelParameters" placeholder="Model Parameters" value={product.modelParameters} onChange={(e) => setModelParameters(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput11">
                                <Form.Label className="mb-0">Product Parameters</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    type="productParameters"
                                    placeholder="Product Parameters"
                                    value={product.productParameters}
                                    onChange={(e) => setProductParameters(e.target.value)} />
                            </Form.Group>

                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={onSubmitForm}>
                                Save Changes
                            </Button>

                        </Form>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={onSubmitForm}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}