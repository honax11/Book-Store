import React from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
    product: string;
    modalIsOpen: boolean;
    closeModal: () => void;
    onDelete: () => void;
}

export const ConfirmationPopup = (props: Props) => {
    const { modalIsOpen, closeModal, product, onDelete } = props;

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal} className="popup__message">

                <Modal.Header closeButton>
                    <Modal.Title className="popup__text">Точно видалити {product}?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="btn btn-secondary me-5" onClick={closeModal}>
                        NO
                    </Button>
                    <Button variant="btn btn-danger" onClick={onDelete}>
                        YES
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )

}