import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ProductType } from 'shared/models/category/ProductType';
import { CategoryToCreate } from 'shared/models/popups/category/CategoryToCreate';
import { post } from 'shared/services/Service';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    refresh: () => void;
}

export const CreateCategoryPopup = (props: Props) => {
    const { modalIsOpen, closeModal, refresh } = props;
    
    const [typeSelect, setTypeSelect] = React.useState(ProductType.Clothes);
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const onHandleTypeSelect = (e: any) => {
        setTypeSelect(e.target.value);
    };

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let categoryToCreate: CategoryToCreate = {
            name: name,
            type: +typeSelect,
            url: url,
            title: title,
            description: description
        }

        post(`Category/Create`, categoryToCreate)
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
                    <Modal.Title>Create Category</Modal.Title>
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Category Name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Url</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Url"
                                autoFocus
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Title"
                                autoFocus
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={5} type="string" placeholder="Description" autoFocus value={description} onChange={(e) => setDescription(e.target.value)} />
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