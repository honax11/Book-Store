import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Category } from 'shared/models/category/Category';
import { ArticleToCreate } from 'shared/models/popups/blog/CategoryToCreate';
import { post } from 'shared/services/Service';

interface Props {
    modalIsOpen: boolean;
    categories: Category[];
    closeModal: () => void;
    refresh: () => void;
}

export const CreateArticlePopup = (props: Props) => {
    const { modalIsOpen, categories, closeModal, refresh } = props;
    
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [mainDescription, setMainDescription] = React.useState('');
    const [category, setCategory] = React.useState('');

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let articleToCreate: ArticleToCreate = {
            name: name,
            mainDescription: mainDescription,
            url: url,
            categoryId: category ? category : categories[0].id
        }

        post(`Magazine/Create`, articleToCreate)
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
                    <Modal.Title>Create Article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Name"
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
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Description"
                                autoFocus
                                value={mainDescription}
                                onChange={(e) => setMainDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
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