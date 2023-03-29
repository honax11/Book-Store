import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ProductType } from 'shared/models/category/ProductType';
import { SizeToCreate } from 'shared/models/popups/size/SizeToCreate';
import { post } from 'shared/services/Service';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    refresh: () => void;
}

export const CreateSizePopup = (props: Props) => {
    const { modalIsOpen, closeModal, refresh } = props;
    
    const [typeSelect, setTypeSelect] = React.useState(ProductType.Clothes);
    const [name, setName] = React.useState('');
    const [order, setOrder] = React.useState(0);
    const [categoryId, setCategoryId] = React.useState<string>('');

    const onHandleTypeSelect = (e: any) => {
        setTypeSelect(e.target.value);
    };

    const onSubmitForm = (event: any) => {
        event.preventDefault();
        let sizeToCreate: SizeToCreate = {
            name: name,
            type: +typeSelect,
            order: order
        }

        post(`Size/Create`, sizeToCreate)
            .then(() => {
                refresh();
                setName("");
                setCategoryId('');
            });
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Select as="select" value={typeSelect} onChange={(e) => onHandleTypeSelect(e)}>
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Order</Form.Label>
                            <Form.Control
                                type="Order"
                                placeholder="Order"
                                autoFocus
                                value={order}
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