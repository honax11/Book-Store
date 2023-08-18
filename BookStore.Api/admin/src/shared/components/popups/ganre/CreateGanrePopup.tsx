import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { GanreToCreate } from 'shared/models/ganre/GanreToCreate';
import { post } from 'shared/services/Service';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    refresh: () => void;
}

export const CreateCategoryPopup = (props: Props) => {
    const { modalIsOpen, closeModal, refresh } = props;

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let ganreToCreate: GanreToCreate = {
            name: name,
            description: description,
        }

        post(`Ganre/Create`, ganreToCreate)
            .then(() => {
                refresh();
                setName("");
                setDescription("");
            }); 
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Ganre</Modal.Title>
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
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="Description"
                                placeholder="Description"
                                autoFocus
                                value={description}
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