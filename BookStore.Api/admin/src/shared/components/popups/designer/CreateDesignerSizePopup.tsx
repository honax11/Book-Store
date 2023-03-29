import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Category } from "shared/models/category/Category";
import { ProductType } from "shared/models/category/ProductType";
import { DesignerSizeToCreate } from "shared/models/designer/DesignerSizeToCreate";
import { post } from "shared/services/Service";
import { showError } from "shared/toast/notification";

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    designerId: string;
    refresh: () => void;
    categories: Category[];
}

export const CreateDesignerSizePopup = (props: Props) => {
    const { modalIsOpen, closeModal, designerId, refresh, categories } = props;
    
    const [typeSelect, setTypeSelect] = React.useState(0);
    const [name, setName] = React.useState('');
    const [breast, setBreast] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [hips, setHips] = React.useState('');
    const [waist, setWaist] = React.useState('');
    const [slipsole, setSlipsole] = React.useState('');
    const [categorySelect, setCategorySelect] = React.useState('');

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let size: DesignerSizeToCreate = {
            name: name,
            type: typeSelect == 0 ? ProductType.Clothes : typeSelect,
            designerId: designerId,
            breast: breast,
            height: height,
            hips: hips,
            waist: waist,
            slipsole: slipsole,
            categoryId: categorySelect
        };

        post(`DesignerSize/Create`, size)
            .then((e) => {
                if (e.status == 500) {
                    showError('Article canont be the same. Or Some error eccured');
                }
                refresh();
                setName("");
                closeModal();
            });
    }

    return (<>
        <Modal show={modalIsOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Designer Size</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Select as="select" value={typeSelect} onChange={(e) => setTypeSelect(+e.target.value)}>
                            <option key={ProductType.Clothes} value={ProductType.Clothes} >Clothes</option>
                            <option key={ProductType.Shose} value={ProductType.Shose} >Shose</option>
                            <option key={ProductType.Accessories} value={ProductType.Accessories} >Accessories</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Select as="select" value={categorySelect} onChange={(e) => setCategorySelect(e.target.value)}>
                            <option key="empty cat"></option>
                            {categories.map(item => (
                                <option key={item.id} value={item.id} >{item.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                        <Form.Label>Breast</Form.Label>
                        <Form.Control type="breast" placeholder="Breast" autoFocus value={breast} onChange={(e) => setBreast(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="height" placeholder="Height" autoFocus value={height} onChange={(e) => setHeight(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                        <Form.Label>Hips</Form.Label>
                        <Form.Control type="hips" placeholder="Hips" autoFocus value={hips} onChange={(e) => setHips(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                        <Form.Label>Waist</Form.Label>
                        <Form.Control type="waist" placeholder="Waist" autoFocus value={waist} onChange={(e) => setWaist(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                        <Form.Label>Slipsole</Form.Label>
                        <Form.Control type="slipsole" placeholder="Slipsole" autoFocus value={slipsole} onChange={(e) => setSlipsole(e.target.value)} />
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
        </Modal></>);
}