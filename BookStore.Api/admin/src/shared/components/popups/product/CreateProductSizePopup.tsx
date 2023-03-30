import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ProductSize } from 'shared/models/popups/product/ProductSize';
import { Size } from 'shared/models/sizes/Size';
import { post } from 'shared/services/Service';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    sizes: Size[];
    productId: string;
    refresh: () => void;
}

export const CreateProductSizePopup = (props: Props) => {
    const { modalIsOpen, closeModal, sizes, productId, refresh } = props;
    
    const [sizeSelect, setSizeSelect] = React.useState('');
    const [quantity, setQuantity] = React.useState(Number);

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let productSizes: ProductSize = {
            productId: productId,
            sizes: []
        }
        productSizes.sizes.push({
            id: sizeSelect ? sizeSelect : sizes[0].id,
            quantity: quantity
        })

        post(`Size/CreateProductSize`, productSizes)
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
                            <Form.Select as="select" value={sizeSelect} onChange={(e) => setSizeSelect(e.target.value)}>
                                {sizes.map(item => {
                                    return <option key={item.id} value={item.id} >{item.name}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="price" placeholder="Quantity" autoFocus value={quantity} onChange={(e) => setQuantity(+e.target.value)} />
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