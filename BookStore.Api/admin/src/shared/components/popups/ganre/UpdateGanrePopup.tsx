import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Ganre } from 'shared/models/ganre/Ganre';
import { post, put } from 'shared/services/Service';

interface Props {
    ganre: Ganre;
    modalIsOpen: boolean;
    setGanre: (cat: Ganre) => void;
    closeModal: () => void;
    refresh: () => void;
}

export const UpdateGanrePopup = (props: Props) => {
    const { ganre, modalIsOpen, setGanre, closeModal, refresh } = props;

    const setName = (name: string) => {
        setGanre({ ...ganre, name });
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        put(`Ganre/Update`, ganre)
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
                                value={ganre?.name}
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