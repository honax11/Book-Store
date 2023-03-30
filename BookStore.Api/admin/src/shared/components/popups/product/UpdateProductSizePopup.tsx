import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ProductSizeGetAllItem } from 'shared/models/product/ProductSizeGetAllItem';
import { post } from 'shared/services/Service';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    productSize: ProductSizeGetAllItem;
    setProductSize: (designer: ProductSizeGetAllItem) => void;
    refresh: () => void;
}

export const UpdateProductSizePopup = (props: Props) => {
    const { modalIsOpen, closeModal, productSize, refresh, setProductSize } = props;
    
    const setQuantity = (quantity: number) => {
        setProductSize({ ...productSize, quantity });
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        post(`Size/UpdateProductSize`, { id: productSize.id, quantity: productSize.quantity })
            .then(() => {
                refresh();
            });
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product Size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Size Name</Form.Label>
                            <Form.Control type="name" placeholder="Name" autoFocus value={productSize.size.name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="quantity" placeholder="Quantity" autoFocus value={productSize.quantity} onChange={(e) => setQuantity(+e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={onSubmitForm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}