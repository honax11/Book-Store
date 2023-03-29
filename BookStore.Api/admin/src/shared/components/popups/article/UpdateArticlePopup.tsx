import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Category } from 'shared/models/category/Category';
import { Magazine } from 'shared/models/magazine/Magazine';
import { post } from 'shared/services/Service';

interface Props {
    magazine: Magazine;
    modalIsOpen: boolean;
    categories: Category[];
    setMagazine: (cat: Magazine) => void;
    closeModal: () => void;
    refresh: () => void;
}

export const UpdateArticlePopup = (props: Props) => {
    const { magazine, modalIsOpen, categories, setMagazine, closeModal, refresh } = props;

    const setName = (name: string) => {
        setMagazine({ ...magazine, name });
    }
    const setUrl = (url: string) => {
        setMagazine({ ...magazine, url });
    }
    const setDescription = (mainDescription: string) => {
        setMagazine({ ...magazine, mainDescription });
    }
    const setCategory = (categoryId: string) => {
        setMagazine({ ...magazine, categoryId });

        const newCategory = categories.filter(item => {
            return item.id == categoryId;
        });
        let newProd = { ...magazine };
        newProd.category = newCategory[0];
        setMagazine(newProd);
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        post(`Magazine/Update`, magazine)
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
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Category Name"
                                autoFocus
                                value={magazine?.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Url</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Url"
                                autoFocus
                                value={magazine?.url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Description"
                                autoFocus
                                value={magazine?.mainDescription}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select as="select" value={magazine?.category?.id} onChange={(e) => setCategory(e.target.value)}>
                                {categories.map(item => {
                                    return <option key={item.id} value={item.id} >{item.name}</option>
                                })}
                            </Form.Select>
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