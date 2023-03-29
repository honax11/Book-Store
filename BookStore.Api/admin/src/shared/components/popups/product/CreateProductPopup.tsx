import React from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Category } from 'shared/models/category/Category';
import { ProductType } from 'shared/models/category/ProductType';
import { Designer } from 'shared/models/designer/Designer';
import { ProductToCreate } from 'shared/models/popups/product/ProductToCreate';
import { post } from 'shared/services/Service';
import { showError } from 'shared/toast/notification';
import { ProductStatus } from 'shared/models/enums/ProductStatus';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    refresh: () => void;
    categories: Category[];
    designers: Designer[];
}

export const CreateProductPopup = (props: Props) => {
    const { modalIsOpen, closeModal, categories, designers, refresh } = props;
    
    const [typeSelect, setTypeSelect] = React.useState(ProductType.Clothes);
    const [statusSelect, setStatusSelect] = React.useState(ProductStatus.OutOfStock);
    const [designerSelect, setDesignerSelect] = React.useState('');
    const [categorySelect, setCategorySelect] = React.useState('');
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [color, setColor] = React.useState('');
    const [article, setArticle] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [price, setPrice] = React.useState(Number);
    const [composition, setComposition] = React.useState('');
    const [measurements, setMeasurements] = React.useState('');
    const [delivery, setDelivery] = React.useState('')
    const [modelParameters, setModelParameters] = React.useState('');
    const [productParameters, setProductParameters] = React.useState('');
    const [code, setCode] = React.useState(Number);

    const onHandleTypeSelect = (e: any) => {
        setTypeSelect(e.target.value);
    };
    const onHandleStatusSelect = (e: any) => {
        setStatusSelect(e.target.value);
    };

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let categoryToCreate: ProductToCreate = {
            name: name,
            type: +typeSelect,
            color: color,
            article: article,
            url: url,
            description: description,
            price: price,
            status: +statusSelect,
            style: 2,
            categoryId: categorySelect ? categorySelect : categories[0].id,
            designerId: designerSelect ? designerSelect : designers[0].id,
            composition: composition,
            measurements: measurements,
            delivery: delivery,
            modelParameters: modelParameters,
            productParameters: productParameters,
            code: +code,
        };

        post(`Product/Create`, categoryToCreate)
            .then((e) => {
                if (e.status == 500) {
                    showError('Article canont be the same. Or Some error eccured');
                }
                refresh();
                setName("");
                closeModal();
            });
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Body className="popupUpdate__body">
                    <Modal.Title className="d-flex justify-content-center">Create Product</Modal.Title>
                    <div className="d-flex justify-content-between">
                        <Form className="popupUpdate__miniBody">
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Row>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                        <Form.Select as="select" value={typeSelect} onChange={(e) => onHandleTypeSelect(e)}>
                                            <option key={ProductType.Clothes} value={ProductType.Clothes} >Clothes</option>
                                            <option key={ProductType.Shose} value={ProductType.Shose} >Shose</option>
                                            <option key={ProductType.Accessories} value={ProductType.Accessories} >Accessories</option>
                                        </Form.Select>
                                    </Col>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                        <Form.Select as="select" value={statusSelect} onChange={(e) => onHandleStatusSelect(e)}>
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
                                        <Form.Select as="select" value={categorySelect} onChange={(e) => setCategorySelect(e.target.value)}>
                                            {categories.map(item => {
                                                return <option key={item.id} value={item.id} >{item.name}</option>
                                            })}
                                        </Form.Select>
                                    </Col>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                        <Form.Select as="select" value={designerSelect} onChange={(e) => setDesignerSelect(e.target.value)}>
                                            {designers.map(item => {
                                                return <option key={item.id} value={item.id} >{item.firstName + ' ' + item.lastName}</option>
                                            })}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput4">
                                <Form.Label className="mb-0">Name</Form.Label>
                                <Form.Control type="name" placeholder="Name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput6">
                                <Form.Label className="mb-0">Color</Form.Label>
                                <Form.Control placeholder="Color" autoFocus value={color} onChange={(e) => setColor(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput7">
                                <Form.Label className="mb-0">Article</Form.Label>
                                <Form.Control type="article" placeholder="Article" autoFocus value={article} onChange={(e) => setArticle(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput7">
                                <Form.Label className="mb-0">Код</Form.Label>
                                <Form.Control type="article" placeholder="Код" autoFocus value={code} onChange={(e) => setCode(+e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput7">
                                <Form.Label className="mb-0">Product Url</Form.Label>
                                <Form.Control type="productUrl" placeholder="Product Url" autoFocus value={url} onChange={(e) => setUrl(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput8">
                                <Form.Label className="mb-0">Price</Form.Label>
                                <Form.Control type="price" placeholder="Price" autoFocus value={price} onChange={(e) => setPrice(+e.target.value)} />
                            </Form.Group>

                        </Form>

                        <Form className="ps-3 popupUpdate__miniBody">

                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput5">
                                <Form.Label className="mb-0">Description</Form.Label>
                                <Form.Control as="textarea" rows={2} type="description" placeholder="Description" autoFocus value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput9">
                                <Form.Label className="mb-0">Composition</Form.Label>
                                <Form.Control as="textarea" rows={2} type="composition" placeholder="Composition" autoFocus value={composition} onChange={(e) => setComposition(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput10">
                                <Form.Label className="mb-0">Measurements</Form.Label>
                                <Form.Control as="textarea" rows={2} type="measurements" placeholder="Measurements" autoFocus value={measurements} onChange={(e) => setMeasurements(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput10">
                                <Form.Label className="mb-0">Delivery</Form.Label>
                                <Form.Control as="textarea" rows={1} type="delivery" placeholder="Delivery" autoFocus value={delivery} onChange={(e) => setDelivery(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput10">
                                <Form.Label className="mb-0">Model Parameters</Form.Label>
                                <Form.Control as="textarea" rows={2} type="modelParameters" placeholder="Model Parameters" autoFocus value={modelParameters} onChange={(e) => setModelParameters(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput10">
                                <Form.Label className="mb-0">Product Parameters</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    type="productParameters"
                                    placeholder="Product Parameters"
                                    autoFocus value={productParameters}
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
            </Modal>
        </>
    );
}