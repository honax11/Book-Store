
import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ProductType } from 'shared/models/category/ProductType';
import { Size } from 'shared/models/sizes/Size';
import { post } from 'shared/services/Service';

interface Props {
    size: Size;
    modalIsOpen: boolean;
    setSize: (cat: Size) => void;
    closeModal: () => void;
    refresh: () => void;
}

export const UpdateSizePopup = (props: Props) => {
    const { size, modalIsOpen, setSize, closeModal, refresh } = props;
    
    const onHandleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = +e.target.value;
        setSize({ ...size, type });
    }
    const setName = (name: string) => {
        setSize({ ...size, name });
    }
    const setOrder = (order: number) => {
        setSize({ ...size, order });
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        post(`Size/Update`, size)
            .then(() => {
                refresh();
                setName("");
            });
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Select as="select" value={size?.type} onChange={(e) => onHandleTypeSelect(e)}>
                                <option key={ProductType.Clothes} value={ProductType.Clothes} >Clothes</option>
                                <option key={ProductType.Shose} value={ProductType.Shose} >Shose</option>
                                <option key={ProductType.Accessories} value={ProductType.Accessories} >Accessories</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Name"
                                autoFocus
                                value={size?.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Order</Form.Label>
                            <Form.Control
                                type="Order"
                                placeholder="Order"
                                autoFocus
                                value={size?.order}
                                onChange={(e) => setOrder(+e.target.value)}
                            />
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