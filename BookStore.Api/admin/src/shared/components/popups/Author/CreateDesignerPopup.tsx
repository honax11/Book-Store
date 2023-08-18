import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Multiselect from 'multiselect-react-dropdown';
import { CreateAuthorView } from 'shared/models/author/CreateAuthorView';
import { Ganre } from 'shared/models/ganre/Ganre';
import { post } from 'shared/services/Service';

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    refresh: () => void;
    ganresAll: Ganre[];
}

export const CreateDesignerPopup = (props: Props) => {

    const { modalIsOpen, closeModal, refresh, ganresAll } = props;

    const [firstName, setFirstName] = React.useState('');
    const [secondName, setSecondName] = React.useState('');
    const [birthDay, setBirthDay] = React.useState(new Date());
    const [dayOfDeath, setDayOfDeath] = React.useState(new Date());
    const [ganres, setGanres] = useState<string[]>([]);

    const onSubmitForm = (event: any) => {
        debugger;
        event.preventDefault();

        let authorToCreate: CreateAuthorView = {
            firstName: firstName,
            secondName: secondName,
            birthDay: birthDay,
            dayOfDeath: dayOfDeath,
            ganres: ganres,
        }

        post(`Designer/Create`, authorToCreate)
            .then(() => {
                refresh();
                setFirstName('');
                setSecondName('');
                setBirthDay(birthDay);
                setDayOfDeath(dayOfDeath);
            });
        closeModal();
    }

    const onSelectGanre = (selectedList: any, selectedItem: any) => {
        let tempGanres = [ ...ganres ];
        tempGanres.push(selectedItem.id);
        setGanres(tempGanres);
    }

    const onRemoveGanre = (selectedList: any, removedItem: any) => {   
        debugger;     
        let tempGanres = [ ...ganres ];
        tempGanres = ganres.filter(x => x !== removedItem.id);
        setGanres(tempGanres);
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Author</Modal.Title>
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
                            <Form.Label>Second Name</Form.Label>
                            <Form.Control
                                type="secondName"
                                placeholder="Second Name"
                                value={secondName}
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Ganres</Form.Label>
                            <Multiselect
                                id='Ganres'
                                options={ganresAll}
                                onSelect={onSelectGanre}
                                onRemove={onRemoveGanre}
                                displayValue="name"
                                placeholder="Ganres"
                                emptyRecordMsg="Всі категорії вибрані" />
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