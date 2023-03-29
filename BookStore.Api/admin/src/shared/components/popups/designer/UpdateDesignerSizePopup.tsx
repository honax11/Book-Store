import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Category } from "shared/models/category/Category";
import { ProductType } from "shared/models/category/ProductType";
import { DesignerSize } from "shared/models/designer/DesignerSize";
import { post } from "shared/services/Service";

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    designerSize: DesignerSize;
    setDesignerSize: (designer: DesignerSize) => void;
    refresh: () => void;
    categories: Category[];
}

export const UpdateDesignerSizePopup = (props: Props) => {
    const { modalIsOpen, closeModal, designerSize, refresh, setDesignerSize, categories } = props;
    
    const setName = (name: string) => {
        setDesignerSize({ ...designerSize, name });
    }

    const onHandleTypeSelect = (type: number) => {
        setDesignerSize({ ...designerSize, type });
    }

    const setBreast = (breast: string) => {
        setDesignerSize({ ...designerSize, breast });
    }
    const setHeight = (height: string) => {
        setDesignerSize({ ...designerSize, height });
    }
    const setHips = (hips: string) => {
        setDesignerSize({ ...designerSize, hips });
    }
    const setWaist = (waist: string) => {
        setDesignerSize({ ...designerSize, waist });
    }
    const setSlipsole = (slipsole: string) => {
        setDesignerSize({ ...designerSize, slipsole });
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        post(`DesignerSize/Update`, designerSize)
            .then(() => {
                refresh();
            });
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product Size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Name" autoFocus value={designerSize.name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Select as="select" value={designerSize?.type} onChange={(e) => onHandleTypeSelect(+e.target.value)}>
                            <option key={ProductType.Clothes} value={ProductType.Clothes} >Clothes</option>
                            <option key={ProductType.Shose} value={ProductType.Shose} >Shose</option>
                            <option key={ProductType.Accessories} value={ProductType.Accessories} >Accessories</option>
                        </Form.Select>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Breast</Form.Label>
                            <Form.Control type="breast" placeholder="Breast" autoFocus value={designerSize.breast} onChange={(e) => setBreast(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Height</Form.Label>
                            <Form.Control type="height" placeholder="Height" autoFocus value={designerSize.height} onChange={(e) => setHeight(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Hips</Form.Label>
                            <Form.Control type="hips" placeholder="Hips" autoFocus value={designerSize.hips} onChange={(e) => setHips(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Waist</Form.Label>
                            <Form.Control type="waist" placeholder="Waist" autoFocus value={designerSize.waist} onChange={(e) => setWaist(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Slipsole</Form.Label>
                            <Form.Control type="slipsole" placeholder="Slipsole" autoFocus value={designerSize.slipsole} onChange={(e) => setSlipsole(e.target.value)} />
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