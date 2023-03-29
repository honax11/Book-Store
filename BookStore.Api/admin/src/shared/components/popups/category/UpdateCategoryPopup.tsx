import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Category } from 'shared/models/category/Category';
import { ProductType } from 'shared/models/category/ProductType';
import { post } from 'shared/services/Service';

interface Props {
    category: Category;
    modalIsOpen: boolean;
    setCategory: (cat: Category) => void;
    closeModal: () => void;
    refresh: () => void;
}

export const UpdateCategoryPopup = (props: Props) => {
    const { category, modalIsOpen, setCategory, closeModal, refresh } = props;
    
    const onHandleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = +e.target.value;
        setCategory({ ...category, type });
    }
    const setName = (name: string) => {
        setCategory({ ...category, name });
    }
    const setUrl = (url: string) => {
        setCategory({ ...category, url });
    }
    const setDescription = (description: string) => {
        setCategory({ ...category, description });
    }
    const setTitle = (title: string) => {
        setCategory({ ...category, title });
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        post(`Category/Update`, category)
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
                    <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Select as="select" value={category?.type} onChange={(e) => onHandleTypeSelect(e)}>
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
                                value={category?.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Url</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Url"
                                autoFocus
                                value={category?.url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Title"
                                autoFocus
                                value={category?.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={5} type="string" placeholder="Description" autoFocus value={category.description} onChange={(e) => setDescription(e.target.value)} />
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