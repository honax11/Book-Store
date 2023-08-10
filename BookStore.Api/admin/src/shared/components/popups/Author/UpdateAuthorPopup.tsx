import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Author } from 'shared/models/author/Author';
import DatePicker from "react-datepicker";
import { UpdateAuthorView } from 'shared/models/author/UpdateAuthorView';
import { post } from 'shared/services/Service';

interface Props {
    author: Author;
    modalIsOpen: boolean;
    setAuthor: (author: Author) => void;
    closeModal: () => void;
    refresh: () => void;
}

export const UpdateAuthorPopup = (props: Props) => {
    const { author, modalIsOpen, setAuthor, closeModal, refresh } = props;

    const [authorToUpdate, setAuthorToUpdate] = useState<UpdateAuthorView>();

    // const setFirstName = (firstName: string) => {
    //     setAuthor({ ...author, firstName });
    // }
    // const setSecondName = (secondName: string) => {
    //     setAuthor({ ...author, secondName });
    // }
    // const setBirthDay = (birthDay: string) => {
    //     setAuthor({ ...author, birthDay });
    // }
    // const setDayOfDeath = (dayOfDeath: string) => {
    //     setAuthor({ ...author, dayOfDeath });
    // }

    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [birthDay, setBirthDay] = useState(new Date());
    const [dayOfDeath, setDayOfDeath] = useState(new Date());
    const [gangeId, setGangeId] = useState('');
    const [ganres, setGanres] = useState<[]>([]);
    const [id, setId] = useState('');
    const [isAvtive, setIsAvtive] = useState(true);
    const [products, setProducts] = useState<[]>([]);

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let authorUpdate: UpdateAuthorView = {
            firstName: firstName,
            secondName: secondName,
            birthDay: birthDay,
            dayOfDeath: dayOfDeath,
            gangeId: gangeId,
            ganres: ganres,
            id: id,
            isAvtive: isAvtive,
            products: products,
        }

        post(`Author/Update`, authorUpdate)
            .then(() => {
                refresh();
                setFirstName("");
                setSecondName("");
                setBirthDay(birthDay);
                setDayOfDeath(dayOfDeath);
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
                                value={author.firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Second Name</Form.Label>
                            <Form.Control
                                type="secondName"
                                placeholder="Second Name"
                                value={author.secondName}
                                onChange={(e) => setSecondName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Birth Day</Form.Label>
                            <DatePicker
                                selected={birthDay}
                                onChange={(birthDay: Date) => setBirthDay(birthDay)}
                                className="form-control modal-number-input"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Day Of Death</Form.Label>
                            <DatePicker
                                selected={dayOfDeath}
                                onChange={(dayOfDeath: Date) => setDayOfDeath(dayOfDeath)}
                                className="form-control modal-number-input"
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