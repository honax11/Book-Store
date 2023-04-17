import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Genre } from 'shared/models/genre/Genre';
import { post, put } from 'shared/services/Service';

interface Props {
    genre: Genre;
    modalIsOpen: boolean;
    setGenre: (cat: Genre) => void;
    closeModal: () => void;
    refresh: () => void;
}

export const UpdateGenrePopup = (props: Props) => {
    const { genre, modalIsOpen, setGenre, closeModal, refresh } = props;

    const setName = (name: string) => {
        setGenre({ ...genre, name });
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        put(`Ganre/Update`, genre)
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
                                value={genre?.name}
                                onChange={(e) => setName(e.target.value)}
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