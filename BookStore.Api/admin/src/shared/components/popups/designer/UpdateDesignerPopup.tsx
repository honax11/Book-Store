import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { UpdateAuthorView } from 'shared/models/author/UpdateAuthorView';
import { post } from 'shared/services/Service';

interface Props {
    author: UpdateAuthorView;
    modalIsOpen: boolean;
    setAuthor: (author: UpdateAuthorView) => void;
    closeModal: () => void;
    refresh: () => void;
}

export const UpdateDesignerPopup = (props: Props) => {
    const { author, modalIsOpen, setAuthor, closeModal, refresh } = props;

    const setId = (id: string) => {
        setAuthor({ ...author, id });
    }
    const setName = (name: string) => {
        setAuthor({ ...author, name });
    }
    const setDescription = (description: string) => {
        setAuthor({ ...author, description });
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        post(`Author/Update`, author)
            .then(() => {
                refresh();
                setId("");
                setName("");
                setDescription("");
            });
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Designer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="ID"
                                placeholder="ID"
                                autoFocus
                                value={author.id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="firstName"
                                placeholder="First Name"
                                autoFocus
                                value={author.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Description"
                                autoFocus
                                value={author.description}
                                onChange={(e) => setDescription(e.target.value)}
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