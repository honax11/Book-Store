import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { DesignerToCreate } from 'shared/models/popups/designer/DesignerToCreate';
import { post } from 'shared/services/Service';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    refresh: () => void;
}

export const CreateDesignerPopup = (props: Props) => {
    const { modalIsOpen, closeModal, refresh } = props;

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [imageAlt, setImageAlt] = React.useState('');

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let designerToCreate: DesignerToCreate = {
            firstName: firstName,
            lastName: lastName,
            description: description,
            url: url,
            imageAlt: imageAlt
        }

        post(`Designer/Create`, designerToCreate)
            .then(() => {
                refresh();
                setFirstName('');
                setLastName('');
                setDescription('');
            });
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Designer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="firstName"
                                placeholder="First Name"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="lastName"
                                placeholder="First Name"
                                autoFocus
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Url</Form.Label>
                            <Form.Control
                                type="DesUrl"
                                placeholder="Designer Url"
                                autoFocus
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Image Alt</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Image Alt"
                                autoFocus
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
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