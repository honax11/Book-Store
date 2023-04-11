import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { GenreToCreate } from 'shared/models/genre/GenreToCreate';
import { post } from 'shared/services/Service';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    refresh: () => void;
}

export const CreateCategoryPopup = (props: Props) => {
    const { modalIsOpen, closeModal, refresh } = props;

    const [name, setName] = React.useState('');
    const [ganreId, setGanreId] = React.useState('');

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let genreToCreate: GenreToCreate = {
            name: name,
            ganreId: ganreId,
        }

        post(`Ganre/Create`, genreToCreate)
            .then(() => {
                refresh();
                setName("");
                setGanreId("");
            });
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Genre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

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
                            <Form.Label>ganreId</Form.Label>
                            <Form.Control
                                type="ganreId"
                                placeholder="ganreId"
                                autoFocus
                                value={ganreId}
                                onChange={(e) => setGanreId(e.target.value)}
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