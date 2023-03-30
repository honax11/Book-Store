import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Designer } from 'shared/models/designer/Designer';
import { post } from 'shared/services/Service';

interface Props {
    designer: Designer;
    modalIsOpen: boolean;
    setDesigner: (designer: Designer) => void;
    closeModal: () => void;
    refresh: () => void;
}

export const UpdateDesignerPopup = (props: Props) => {
    const { designer, modalIsOpen, setDesigner, closeModal, refresh } = props;

    const setFirstName = (firstName: string) => {
        setDesigner({ ...designer, firstName });
    }
    const setLastName = (lastName: string) => {
        setDesigner({ ...designer, lastName });
    }
    const setUrl = (url: string) => {
        setDesigner({ ...designer, url });
    }
    const setDescription = (description: string) => {
        setDesigner({ ...designer, description });
    }
    const setImageAlt = (imageAlt: string) => {
        setDesigner({ ...designer, imageAlt });
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        post(`Designer/Update`, designer)
            .then(() => {
                refresh();
                setFirstName("");
                setLastName("");
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="firstName"
                                placeholder="First Name"
                                autoFocus
                                value={designer.firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="lastName"
                                placeholder="First Name"
                                autoFocus
                                value={designer.lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Url</Form.Label>
                            <Form.Control
                                type="DesUrl"
                                placeholder="Designer Url"
                                autoFocus
                                value={designer.url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Image Alt</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Image Alt"
                                autoFocus
                                value={designer.imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Description"
                                autoFocus
                                value={designer.description}
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